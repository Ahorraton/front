'use client'

import React from 'react';
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

const MiLista: React.FC = () => {
    const list = useSelector((state: RootState) => state.list.items);
    const listName = useSelector((state: RootState) => state.list.name);
    const dispatch = useDispatch();

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
                {list.map(item => {
                    const price_and_market = item.market_price ? item.market_price.split(',').map(pair => pair.trim()) : [];
                    const prices = price_and_market.map(price_market => parseFloat(price_market.split(' ')[1]));
                    const urls = item.urls ? item.urls.split(',') : [];
                    const minPrice = Math.min(...prices);
                    const maxPrice = Math.max(...prices);
                    const green = hexToRgb("#157a01");
                    const black = hexToRgb("#000000");

                    const getColorForPrice = (price: number): string => {
                        const normalizedPrice = (price - minPrice) / (maxPrice - minPrice);
                        const interpolatedColor = interpolateColor(green, black, normalizedPrice);
                        return rgbToHex(interpolatedColor);
                    };

                    return (
                        <ListItem key={item.ean}>
                            <Paper className='card-layout' elevation={8} style={{ width: '100%' }}>
                                <Box className='product-layout'>
                                    <Box className='card-title-box'>
                                        <Typography justifyContent='center' align='center' variant="h5" padding='2%'>
                                            {item.name ? item.name.split(',')[0] : 'Producto sin nombre'}
                                        </Typography>
                                    </Box>
                                    <Box className='product-row'>
                                        <Box
                                            component='img'
                                            src={item.image_url}
                                            className='product-image'
                                            style={{ width: '100px', height: '100px' }}
                                        />
                                        <Box className='market-row'>
                                            {price_and_market.map((price_market: string, index: number) => {
                                                const market_price_vec = price_market.split(' ');
                                                const logo = marketImage(market_price_vec[0]);
                                                const price = market_price_vec[1];
                                                const color = getColorForPrice(parseFloat(price));
                                                return <Price
                                                    key={price_market}
                                                    logo={logo}
                                                    price={price}
                                                    color={color}
                                                    cheapest={parseFloat(price) === minPrice}
                                                    url={urls[index]}
                                                />;
                                            })}
                                        </Box>
                                    </Box>
                                    <Box className='quantity-controls' display="flex" alignItems="center">
                                        <IconButton onClick={() => handleAddQuantity(item.ean)}>
                                            <AddIcon />
                                        </IconButton>
                                        <Typography variant="body1" style={{ margin: '0 10px' }}>
                                            {item.quantity}
                                        </Typography>
                                        <IconButton onClick={() => handleRemoveQuantity(item.ean)}>
                                            <RemoveIcon />
                                        </IconButton>
                                        <IconButton onClick={() => handleDeleteItem(item.ean)}>
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

