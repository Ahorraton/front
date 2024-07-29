"use client"
import React from "react"
import { Box, Typography } from "@mui/material"


const marketImage = (market: string) => {
    console.log(market);
    switch(market) {
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

const Price = ({market_price} : {market_price: string}) => {
    
    const market_price_vec = market_price.split(' ');
    const logo = marketImage(market_price_vec[0]);
    const price = market_price_vec[1]; /* Suponiendo que no existe market con espacio en el nombre */

    return (
        <Box display='flex' flexDirection='column' alignItems='center'>
            <Box
                component='img'
                src={logo}
                sx={{
                    width: '10vw',
                    height: 'auto',
                }} />
            <Typography variant="h6">
                {price}
            </Typography>
        </Box>
    )
}

export default Price