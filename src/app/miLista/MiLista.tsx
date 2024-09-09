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
            // Mock response data
            const mockData = {
                "products": [
                    {
                        "id": 1,
                        "name": "Gaseosa Schweppes Tónica 1.5 Lt.",
                        "price": 2500,
                        "price_per_unit": null,
                        "created_at": "2024-09-09T05:08:48.083000",
                        "market": "vea",
                        "image_url": "https://ardiaprod.vtexassets.com/arquivos/ids/311168-800-auto?v=638599382953170000&width=800&height=auto&aspect=true",
                        "ean": "7790895006715",
                        "url": "https://diaonline.supermercadosdia.com.ar/gaseosa-schweppes-tonica-15-lt-115296/p"
                    },
                    {
                        "id": 2,
                        "name": "Gaseosa Schweppes Tónica 1.5 Lt.",
                        "price": 2509,
                        "price_per_unit": null,
                        "created_at": "2024-09-09T05:08:48.083000",
                        "market": "dia",
                        "image_url": "https://ardiaprod.vtexassets.com/arquivos/ids/311168-800-auto?v=638599382953170000&width=800&height=auto&aspect=true",
                        "ean": "7790895006715",
                        "url": "https://diaonline.supermercadosdia.com.ar/gaseosa-schweppes-tonica-15-lt-115296/p"
                    },
                    {
                        "id": 3,
                        "name": "3",
                        "price": 3,
                        "price_per_unit": null,
                        "created_at": "2024-09-09T05:08:48.083000",
                        "market": "3",
                        "image_url": null,
                        "ean": "7790895006715",
                        "url": null
                    },
                    {
                        "id": 4,
                        "name": "Gaseosa Schweppes Pomelo Zero 2.25 Lt.",
                        "price": 3101,
                        "price_per_unit": null,
                        "created_at": "2024-09-09T05:08:48.083000",
                        "market": "coto",
                        "image_url": "https://ardiaprod.vtexassets.com/arquivos/ids/318602-800-auto?v=638599491889630000&width=800&height=auto&aspect=true",
                        "ean": "8890895010095",
                        "url": "https://diaonline.supermercadosdia.com.ar/gaseosa-schweppes-pomelo-zero-225-lt-259397/p"
                    },
                    {
                        "id": 5,
                        "name": "Gaseosa Schweppes Pomelo Zero 2.25 Lt.",
                        "price": 3000,
                        "price_per_unit": null,
                        "created_at": "2024-09-09T05:08:48.083000",
                        "market": "carrefour",
                        "image_url": "https://ardiaprod.vtexassets.com/arquivos/ids/318602-800-auto?v=638599491889630000&width=800&height=auto&aspect=true",
                        "ean": "8890895010095",
                        "url": "https://diaonline.supermercadosdia.com.ar/gaseosa-schweppes-pomelo-zero-225-lt-259397/p"
                    },
                    {
                        "id": 6,
                        "name": "6",
                        "price": 6,
                        "price_per_unit": null,
                        "created_at": "2024-09-09T05:08:48.083000",
                        "market": "6",
                        "image_url": null,
                        "ean": "8890895010095",
                        "url": null
                    }
                ]
            };

            const productsWithQuantity = mockData.products.map((product: Product) => {
                const localItem = list.find(item => item.ean === product.ean);
                return {
                    ...product,
                    quantity: localItem ? localItem.quantity : 0
                };
            });
            setProducts(productsWithQuantity);
            console.log(productsWithQuantity);
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
