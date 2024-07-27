"use client"
import React, { useEffect } from "react";
import { Box, Button, Paper, Typography } from "@mui/material";
import Product from "@/app/comparar/types/Product"
import "@/app/comparar/compare.css";

const ProductRow = ({ product } : { product: Product }) => {
    const price_and_market = product.market_price.split(',');
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
                            width: '10%',
                            height: '10%',
                        }}
                        />
                    <Box className = 'market-row'>
                        {price_and_market.map((price_market: string) => (
                            <Typography variant="h6">
                                {price_market}
                            </Typography>
                        ))}
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