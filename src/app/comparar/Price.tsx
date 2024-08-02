"use client"
import React from "react"
import { Box, Typography } from "@mui/material"
import Paper from '@mui/material/Paper';
import '@/app/comparar/price.css'

const Price = (
    { logo, price, color, cheapest }:
    { logo: string; price: string, color: string, cheapest: boolean}
) => {
    const classNameCheapest = cheapest ? 'price-column-cheapest' : 'price-column';
    return (
        <Box className = 'price-layout'>
            <Paper className={classNameCheapest} elevation={3}>
                <Box
                    component='img'
                    src={logo}
                    className = 'price-market-logo'
                    />
                <Typography
                    className="price"
                    sx={{
                        color: color,
                    }}>
                    ${price}
                </Typography>
            </Paper>
        </Box>
    )
}

export default Price