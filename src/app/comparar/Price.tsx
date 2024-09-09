
"use client"
import React from "react"
import { Box, ButtonBase, Typography } from "@mui/material"
import Paper from '@mui/material/Paper';
import '@/app/comparar/price.css'

const Price = (
    { logo, price, color, cheapest, url }:
    { logo: string; price: string, color: string, cheapest: boolean, url: string | undefined}
) => {
    const classNameCheapest = cheapest ? 'price-column-cheapest' : 'price-column';
    const handleClick = (link: string | undefined) => {
        window.open(link, '_blank');
    }
    return (
        <Box className = 'price-layout'>
            <ButtonBase onClick={() => handleClick(url)}>
                <Paper className={classNameCheapest} elevation={3}>
                    <Box
                        component='img'
                        src={logo}
                        className = 'price-market-logo'
                        />
                    <Typography
                        sx={{
                            color: color,
                            fontWeight: 'bold',
                        }}>
                        ${price}
                    </Typography>
                </Paper>
            </ButtonBase>
        </Box>
    )
}

export default Price