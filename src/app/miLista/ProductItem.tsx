import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { ListItem, Paper, Box, Typography, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteIcon from '@mui/icons-material/Delete';
import { addItem, removeItem, deleteItem } from '../../redux/store/listSlice';
import Price from '@/app/comparar/Price';
import { hexToRgb, interpolateColor, rgbToHex, marketImage } from '../comparar/ProductPaperAle';
import WarningModal from './WarningModal';

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

type ProductItemProps = {
    product: Product;
};

const ProductItem: React.FC<ProductItemProps> = ({ product }) => {
    const dispatch = useDispatch();
    const [isWarningOpen, setIsWarningOpen] = useState(false);
    const [warningAction, setWarningAction] = useState<() => void>(() => {});

    const handleAddQuantity = (ean: string) => {
        dispatch(addItem({ ean, quantity: 1 }));
    };

    const handleRemoveQuantity = (ean: string) => {
        if (product.quantity && product.quantity > 1) {
            dispatch(removeItem(ean));
        } else {
            setWarningAction(() => () => dispatch(removeItem(ean)));
            setIsWarningOpen(true);
        }
    };

    const handleDeleteItem = (ean: string) => {
        setWarningAction(() => () => dispatch(deleteItem(ean)));
        setIsWarningOpen(true);
    };

    const handleCloseWarning = () => {
        setIsWarningOpen(false);
    };

    const handleConfirmWarning = () => {
        warningAction();
        setIsWarningOpen(false);
    };

    const prices = [product.price];
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
        <>
            <ListItem>
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
            <WarningModal
                open={isWarningOpen}
                onClose={handleCloseWarning}
                onConfirm={handleConfirmWarning}
                title="Confirmar eliminación"
                message="¿Deseas eliminar este producto de la lista?"
            />
        </>
    );
};

export default ProductItem;
