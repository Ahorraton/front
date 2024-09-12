'use client'

import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../redux/store';
import { Box, TextField, Typography, Button, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SaveIcon from '@mui/icons-material/Save';
import { setListName, clearList } from '../../redux/store/listSlice';
import { selectList } from '../../redux/store/multipleListsSlice';
import ProductList from './ProductList';
import TotalPrice from './TotalPrice';
import Filters from './Filters';
import ListSelector from './ListSelector';
import SaveListDialog from './SaveListDialog';
import "./myList.css";
import axios from 'axios';
import { fetchUserLists } from '../../utils/apiUtils';

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
    const selectedListId = useSelector((state: RootState) => state.multipleLists.selectedListId);
    const user = useSelector((state: RootState) => state.user);
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
        if (user.userInfo?.id) {
            fetchUserLists(user.userInfo.id, dispatch);
        }
    }, [user, dispatch]);

    const handleListNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setListName(event.target.value));
        setIsListSaved(false);
    };

    const handleSaveList = async () => {
        try {
            const user_id = user.userInfo?.id;
            if (user_id === undefined || user_id === null) {
                console.error('User ID is not defined');
                return;
            }

            const productsToSave = list.map(item => ({
                product_code: item.ean,
                amount: item.quantity
            }));

            const endpoint = selectedListId ? '/api/list/updateList' : '/api/list/createList';
            const payload = selectedListId
                ? { user_id, grocery_list_id: selectedListId, name: listName, products: productsToSave }
                : { user_id, name: listName, products: productsToSave };

            const response = await axios.post(endpoint, payload);

            console.log('List saved:', response.data);
            setIsListSaved(true);
            if (!selectedListId) {
                dispatch(clearList()); // Clear the list after saving if it's a new list
            }
            await fetchUserLists(user_id, dispatch); // Fetch the lists again to update the dropdown
        } catch (error) {
            console.error('Error saving list:', error);
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

    const handleMarketChange = (market: string) => {
        if (selectedMarkets.includes(market)) {
            setSelectedMarkets(selectedMarkets.filter((m) => m !== market));
        } else {
            setSelectedMarkets([...selectedMarkets, market]);
        }
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
                <ListSelector
                    isListSaved={isListSaved}
                    setPendingListId={setPendingListId}
                    setOpenDialog={setOpenDialog}
                />
                <TextField
                    label="Nombre de mi lista"
                    value={listName}
                    onChange={handleListNameChange}
                    fullWidth
                />
            </Typography>
            <TotalPrice totalPrice={totalPrice} />
            <Box textAlign="center" mt={2}>
                <Button
                    variant="contained"
                    color="primary"
                    startIcon={<SaveIcon />}
                    onClick={handleSaveList}
                >
                    {selectedListId ? 'Actualizar mi lista' : 'Guardar mi lista'}
                </Button>
            </Box>
            <ProductList products={cheapestProducts} />
            <SaveListDialog
                open={openDialog}
                handleClose={handleDialogClose}
                handleSave={handleDialogSave}
                handleDiscard={handleDialogDiscard}
            />
        </Box>
    );
};

export default MiLista;