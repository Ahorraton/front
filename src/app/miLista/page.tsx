'use client'

import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../redux/store';
import { Box, List, ListItem, ListItemText, IconButton, TextField, Typography, Button, Paper } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import { addItem, removeItem, deleteItem, setListName, clearList } from '../../redux/store/listSlice';
import Price from '@/app/comparar/Price';
import { hexToRgb, interpolateColor, rgbToHex, marketImage } from '../comparar/ProductPaperAle';

type Product = {
    id: number;
    name: string;
    price: number;
    price_per_unit: number | null; // Allow null for price_per_unit
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

    useEffect(() => {
        const fetchProducts = async () => {
            // Mock response data
            const mockData = {
                "products": [
                    {
                        "id": 1,
                        "name": "1",
                        "price": 1,
                        "price_per_unit": null,
                        "created_at": "2024-09-09T05:08:48.083000",
                        "market": "1",
                        "image_url": null,
                        "ean": "8890895010095",
                        "url": null
                    },
                    {
                        "id": 2,
                        "name": "2",
                        "price": 2,
                        "price_per_unit": null,
                        "created_at": "2024-09-09T05:08:48.083000",
                        "market": "2",
                        "image_url": null,
                        "ean": "8890895010095",
                        "url": null
                    },
                    {
                        "id": 3,
                        "name": "3",
                        "price": 3,
                        "price_per_unit": null,
                        "created_at": "2024-09-09T05:08:48.083000",
                        "market": "3",
                        "image_url": null,
                        "ean": "8890895010095",
                        "url": null
                    },
                    {
                        "id": 4,
                        "name": "4",
                        "price": 4,
                        "price_per_unit": null,
                        "created_at": "2024-09-09T05:08:48.083000",
                        "market": "4",
                        "image_url": null,
                        "ean": "7790895006715",
                        "url": null
                    },
                    {
                        "id": 5,
                        "name": "5",
                        "price": 5,
                        "price_per_unit": null,
                        "created_at": "2024-09-09T05:08:48.083000",
                        "market": "5",
                        "image_url": null,
                        "ean": "7790895006715",
                        "url": null
                    },
                    {
                        "id": 6,
                        "name": "6",
                        "price": 6,
                        "price_per_unit": null,
                        "created_at": "2024-09-09T05:08:48.083000",
                        "market": "6",
                        "image_url": null,
                        "ean": "7790895006715",
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

    const handleAddQuantity = (ean: string) => {
        dispatch(addItem({ ean, quantity: 1 }));
    };

    const handleRemoveQuantity = (ean: string) => {
        dispatch(removeItem(ean));
    };

    const handleDeleteItem = (ean: string) => {
        dispatch(deleteItem(ean));
    };

    const handleListNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setListName(event.target.value));
    };

    const handleSaveList = () => {
        // Save list logic will be implemented later
        console.log('List saved');
    };

    return (
        <Box m={2}>
            <Typography variant="h4" gutterBottom>
                <TextField
                    label="Nombre de mi lista"
                    value={listName}
                    onChange={handleListNameChange}
                    fullWidth
                />
            </Typography>
            <List>
                {products.map(product => {
                    const prices = products.map(p => p.price);
                    const minPrice = Math.min(...prices);
                    const maxPrice = Math.max(...prices);
                    const green = hexToRgb("#157a01");
                    const black = hexToRgb("#000000");

                    const getColorForPrice = (price: number): string => {
                        const normalizedPrice = (price - minPrice) / (maxPrice - minPrice);
                        const interpolatedColor = interpolateColor(green, black, normalizedPrice);
                        return rgbToHex(interpolatedColor);
                    };

                    const color = getColorForPrice(product.price);
                    const logo = marketImage(product.market);

                    return (
                        <ListItem key={product.id}>
                            <Paper className='card-layout' elevation={8} style={{ width: '100%' }}>
                                <Box className='product-layout'>
                                    <Box className='card-title-box'>
                                        <Typography justifyContent='center' align='center' variant="h5" padding='2%'>
                                            {product.name ? product.name.split(',')[0] : 'Producto sin nombre'}
                                        </Typography>
                                    </Box>
                                    <Box className='product-row'>
                                        <Box
                                            component='img'
                                            src={product.image_url || ''}
                                            className='product-image'
                                            style={{ width: '100px', height: '100px' }}
                                        />
                                        <Box className='market-row'>
                                            <Price
                                                logo={logo}
                                                price={product.price.toString()}
                                                color={color}
                                                cheapest={product.price === minPrice}
                                                url={product.url || ''}
                                            />
                                        </Box>
                                    </Box>
                                    <Box className='quantity-controls' display="flex" alignItems="center">
                                        <IconButton onClick={() => handleAddQuantity(product.ean)}>
                                            <AddIcon />
                                        </IconButton>
                                        <Typography variant="body1" style={{ margin: '0 10px' }}>
                                            {product.quantity}
                                        </Typography>
                                        <IconButton onClick={() => handleRemoveQuantity(product.ean)}>
                                            <RemoveIcon />
                                        </IconButton>
                                        <IconButton onClick={() => handleDeleteItem(product.ean)}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </Box>
                                </Box>
                            </Paper>
                        </ListItem>
                    );
                })}
            </List>
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
