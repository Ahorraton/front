'use client'

import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../redux/store';
import { Box, TextField, Typography, Button, Accordion, AccordionSummary, AccordionDetails, MenuItem, Select, SelectChangeEvent, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SaveIcon from '@mui/icons-material/Save';
import { setListName, clearList, addItem } from '../../redux/store/listSlice';
import { setLists, selectList } from '../../redux/store/multipleListsSlice';
import ProductList from './ProductList';
import TotalPrice from './TotalPrice';
import Filters from './Filters';
import "./myList.css";
import axios from 'axios';

type Product = {
    id: number;
    name: string;
    price: number;
    price_per_unit: number | null;
    created_at: string;
    market: string;
    image_url: string | null;
    ean: string;
    url: string | null;
    quantity?: number;
};

const MiLista: React.FC = () => {
    const list = useSelector((state: RootState) => state.list.items);
    const listName = useSelector((state: RootState) => state.list.name);
    const user = useSelector((state: RootState) => state.user);
    const multipleLists = useSelector((state: RootState) => state.multipleLists);
    const dispatch = useDispatch();
    const [products, setProducts] = useState<Product[]>([]);
    const [selectedMarkets, setSelectedMarkets] = useState<string[]>(['carrefour', 'coto', 'dia', 'vea', 'disco', 'jumbo']);
    const [isListSaved, setIsListSaved] = useState<boolean>(true);
    const [openDialog, setOpenDialog] = useState<boolean>(false);
    const [pendingListId, setPendingListId] = useState<number | null>(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const products_eans = list.map(item => item.ean);
                const response = await axios.post('/api/list/getProducts', {
                    products_eans: products_eans
                });
                const productsWithQuantity = response.data.data.products.map((product: Product) => {
                    const localItem = list.find(item => item.ean === product.ean);
                    return {
                        ...product,
                        quantity: localItem ? localItem.quantity : 0
                    };
                });
                setProducts(productsWithQuantity);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, [list]);

    useEffect(() => {
        const fetchUserLists = async () => {
            try {
                const response = await axios.get('/api/list/getLists', {
                    params: { user_id: user.userInfo?.id }
                });
                const groceryLists = response.data.data.grocery_list_ids;
                console.log("Grocery lists:", groceryLists);
                if (Array.isArray(groceryLists)) {
                    dispatch(setLists(groceryLists));
                    if (groceryLists.length > 0) {
                        dispatch(selectList(groceryLists[0].id));
                    }
                } else {
                    console.error('Fetched grocery lists is not an array:', groceryLists);
                }
            } catch (error) {
                console.error('Error fetching user lists:', error);
            }
        };

        fetchUserLists();
    }, [user]);

    const handleListNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setListName(event.target.value));
        setIsListSaved(false);
    };

    const handleSaveList = async () => {
        try {
            const user_id = user.userInfo?.id;
            const productsToSave = list.map(item => ({
                product_code: item.ean,
                amount: item.quantity
            }));

            const response = await axios.post('/api/list/createList', {
                user_id,
                name: listName,
                products: productsToSave
            });

            console.log('List saved:', response.data);
            setIsListSaved(true);
        } catch (error) {
            console.error('Error saving list:', error);
        }
    };

    const handleMarketChange = (market: string) => {
        if (selectedMarkets.includes(market)) {
            setSelectedMarkets(selectedMarkets.filter((m) => m !== market));
        } else {
            setSelectedMarkets([...selectedMarkets, market]);
        }
    };

    const handleListChange = (event: SelectChangeEvent<number>) => {
        if (!isListSaved) {
            setPendingListId(Number(event.target.value));
            setOpenDialog(true);
        } else {
            dispatch(selectList(Number(event.target.value)));
        }
    };

    const handleDialogClose = () => {
        setOpenDialog(false);
        setPendingListId(null);
    };

    const handleDialogSave = async () => {
        await handleSaveList();
        if (pendingListId !== null) {
            dispatch(selectList(pendingListId));
        }
        handleDialogClose();
    };

    const handleDialogDiscard = () => {
        if (pendingListId !== null) {
            dispatch(selectList(pendingListId));
        }
        handleDialogClose();
    };

    const filteredProducts = products.filter(product => selectedMarkets.includes(product.market));

    const cheapestProducts = Object.values(filteredProducts.reduce((acc, product) => {
        if (!acc[product.ean] || acc[product.ean].price > product.price) {
            acc[product.ean] = product;
        }
        return acc;
    }, {} as { [key: string]: Product }));

    const totalPrice = cheapestProducts.reduce((total, product) => total + (product.price * (product.quantity || 0)), 0);

    return (
        <Box m={2}>
            <Accordion>
                <AccordionSummary
                    sx={{
                        '& .MuiAccordionSummary-content': {
                            justifyContent: 'center',
                        }
                    }}
                    expandIcon={<ExpandMoreIcon />}
                >
                    <h3>Filtros</h3>
                </AccordionSummary>
                <AccordionDetails>
                    <Filters selectedMarkets={selectedMarkets} handleMarketChange={handleMarketChange} />
                </AccordionDetails>
            </Accordion>
            <Typography variant="h4" gutterBottom>
                <Select
                    value={multipleLists.selectedListId || ''}
                    onChange={handleListChange}
                    displayEmpty
                    fullWidth
                >
                    {Array.isArray(multipleLists.lists) && multipleLists.lists.map(list => (
                        <MenuItem key={list.id} value={list.id}>
                            {list.name}
                        </MenuItem>
                    ))}
                </Select>
                <TextField
                    label="Nombre de mi lista"
                    value={listName}
                    onChange={handleListNameChange}
                    fullWidth
                />
            </Typography>
            <TotalPrice totalPrice={totalPrice} />
            <ProductList products={cheapestProducts} />
            <Box textAlign="center" mt={2}>
                <Button
                    variant="contained"
                    color="primary"
                    startIcon={<SaveIcon />}
                    onClick={handleSaveList}
                >
                    Guardar mi lista
                </Button>
            </Box>
            <Dialog
                open={openDialog}
                onClose={handleDialogClose}
            >
                <DialogTitle>Guardar lista</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        La lista actual no ha sido guardada. ¿Desea guardarla antes de cambiar a otra lista?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDialogClose} color="primary">
                        Cancelar
                    </Button>
                    <Button onClick={handleDialogDiscard} color="primary">
                        Descartar
                    </Button>
                    <Button onClick={handleDialogSave} color="primary" autoFocus>
                        Guardar
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default MiLista;
