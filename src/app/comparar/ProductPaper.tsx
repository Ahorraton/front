"use client"
import React from "react";
import { Box, Paper, Typography } from "@mui/material";
import Product from "@/app/comparar/types/Product"
import "@/app/comparar/compare-luis.css";
import PriceLuis from "@/app/comparar/PriceLuis";

const marketImage = (market: string) => {
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
    const [selected, setSelected] = React.useState<boolean[]>([false, false, false, false, false, false]);
    const price_and_market = product.market_price.split(',').map(pair => pair.trim());
    const prices = price_and_market.map(price_market => parseFloat(price_market.split(' ')[1]));
    const minPrice = Math.min(...prices);
    const cheapestIndex = prices.indexOf(minPrice);
    const handleSelectCheapest = () => {
        const newSelected = selected.map((_, index) => index === cheapestIndex);
        setSelected(newSelected);
    };

    React.useEffect(() => {
        handleSelectCheapest();
    }, []);

    return (
        <Paper className = 'card-layout'>
            <Box className = 'product-layout'>
                <Typography justifyContent='center' align='center' variant="h3">
                    {product.names_list.split(',')[0]}
                </Typography>
                <Box className = 'product-row'>
                    <Box
                        component='img'
                        src={product.image_url}
                        sx={{
                            maxWidth: 'auto',
                            height: '30vh',
                        }}
                        />
                    <Box className = 'market-row-hola'>
                        {price_and_market.map((price_market: string, index: number) => {
                            const market_price_vec = price_market.split(' ');
                            const logo = marketImage(market_price_vec[0]); /* Suponiendo que no existe market con espacio en el nombre */
                            const price = market_price_vec[1];
                            return (
                                <PriceLuis
                                    key={price_market}
                                    logo={logo}
                                    selected={selected[index]}
                                />
                            );
                        })}
                    </Box>
                </Box>
                <Box className='selected-price-display'>
                    <Typography variant='h4'>
                        ${prices.find((_, index) => selected[index])}
                    </Typography>
                </Box>
                {/* <Box className = 'row-actions'>
                    <Button>
                        Ma
                    </Button>
                    <Button>
                        Meno
                    </Button>
                </Box> */}
            </Box>
        </Paper>
    )
}

export default ProductRow;