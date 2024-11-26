import React from 'react';
import { Box, Typography } from '@mui/material';
import './title.css';

interface CardTitleProps {
    logo: string;
    product: {
        name?: string;
    };
}

const CardTitle: React.FC<CardTitleProps> = ({ logo, product }) => {
    return (
        <Box className='card-title-layout'>
            <Box component='img' src={logo} className='market-image' />
            <Box className='card-title'>
                <Typography
                    justifyContent="center"
                    align="center"
                    variant="h5"
                    padding='1%'
                >
                    {product.name ? product.name : "Producto sin nombre"}
                </Typography>
            </Box>
        </Box>
    );
};

export default CardTitle;