"use client"
import React, { useEffect } from "react";
import { Box, Button, Paper, Typography } from "@mui/material";
import Product from "@/app/comparar/types/Product"
import "@/app/comparar/compare.css";
import Price from "@/app/comparar/Price";

// Helper function to interpolate between two colors
const interpolateColor = (color1: number[], color2: number[], factor: number): number[] => {
    const result = color1.slice();
    for (let i = 0; i < color1.length; i++) {
        result[i] = Math.round(result[i] + factor * (color2[i] - color1[i]));
    }
    return result;
};

// Helper function to convert RGB array to hex string
const rgbToHex = (rgb: number[]): string => {
    return '#' + rgb.map(x => x.toString(16).padStart(2, '0')).join('');
};

// Convert a color in hex format to an array of RGB values
const hexToRgb = (hex: string): number[] => {
    return hex.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i
                , (m, r, g, b) => '#' + r + r + g + g + b + b)
                .substring(1).match(/.{2}/g)!
                .map(x => parseInt(x, 16));
};

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

const ProductRow = ({ product } : { product: Product }) => {
    const price_and_market = product.market_price.split(',').map(pair => pair.trim());
    const prices = price_and_market.map(price_market => parseFloat(price_market.split(' ')[1]));
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
        <Paper className = 'card-layout'>
            <Box className = 'product-layout'>
                <Typography justifyContent='center' align='center' variant="h1">
                    {product.names_list.split(',')[0]}
                </Typography>
                <Box className = 'product-row'>
                    <Box
                        component='img'
                        src={product.image_url}
                        sx={{
                            width: '15vw',
                        }}
                        />
                    <Box className = 'market-row'>
                    {price_and_market.map((price_market: string) => {
                        const market_price_vec = price_market.split(' ');
                        const logo = marketImage(market_price_vec[0]); /* Suponiendo que no existe market con espacio en el nombre */
                        const price = market_price_vec[1];
                        const color = getColorForPrice(parseFloat(price));
                        return <Price
                            key={price_market}
                            logo={logo}
                            price={price}
                            color={color}
                            />;
                    })}
                    </Box>
                    <Box className = 'row-actions'>
                        <Button>
                            Ma
                        </Button>
                        <Button>
                            Meno
                        </Button>
                    </Box>
                </Box>
            </Box>
        </Paper>
    )
}

export default ProductRow;