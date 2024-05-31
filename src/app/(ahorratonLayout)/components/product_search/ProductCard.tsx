import React from 'react';
import { Box , Button, Typography } from '@mui/material';
import { Card, CardMedia, CardContent } from '@mui/material';
import Product from '../types/Product';
import './product_card.css';

const ProductCard = ({ product } : { product: Product }) => {

    const marketImage = () => {
        console.log(product.market)
        if (product.image_url) {
            return product.image_url;
        }

        switch(product.market) {
            case 'disco':
                return '/images/logos/logo_disco.svg';
            case 'carrefour':
                return '/images/logos/logo_carrefour.svg';
            case 'jumbo':
                return '/images/logos/logo_jumbo.png';
            case 'dia':
                return '/images/logos/logo_dia.svg';
            case 'vea':
                return '/images/logos/logo_vea.png';
            case 'coto':
                return '/images/logos/logo_coto.svg';
            default:
                return 'https://i5.walmartimages.com/asr/e9ff8590-58ad-44f4-8a74-99aff8a72ea9.1bb69167e16a3d0209eb310e758fcb36.jpeg';
        }
    }

    return (
        <Card sx={{ maxWidth: 350, width: '100%', margin: 'auto' }}>
            <CardContent className='product-row'>
                <Typography variant="h5">
                    {product.market.charAt(0).toUpperCase() + product.market.slice(1)}
                </Typography>
            </CardContent>
            <CardMedia
                component="img"
                alt={product.name}
                image={marketImage()}
            />
            <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {product.name}
                    </Typography>
            </CardContent>
            <Box className='product-row'>
                <Button size="small">Agregar a carrito</Button>
                <Typography variant="h6" component="div">
                    ${product.price}
                </Typography>
            </Box>
        </Card>
    );
};

export default ProductCard;
