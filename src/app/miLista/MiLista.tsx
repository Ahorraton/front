'use client'

import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../redux/store';
import { Box, TextField, Typography, Button, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SaveIcon from '@mui/icons-material/Save';
import { setListName } from '../../redux/store/listSlice';
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
    const dispatch = useDispatch();
    const [products, setProducts] = useState<Product[]>([]);
    const [selectedMarkets, setSelectedMarkets] = useState<string[]>(['carrefour', 'coto', 'dia', 'vea', 'disco', 'jumbo']);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const products_eans = list.map(item => item.ean);
                const response = await axios.post('/api/list/getProducts', {
                    products_eans: products_eans
                });
                console.log('response.data.data.products:', response.data.data.products);
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

    const handleListNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setListName(event.target.value));
    };

    const handleSaveList = () => {
        // Save list logic will be implemented later
        console.log('List saved');
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
        </Box>
    );
};

export default MiLista;
