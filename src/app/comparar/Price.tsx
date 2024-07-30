"use client"
import React from "react"
import { Box, Typography } from "@mui/material"
import Paper from '@mui/material/Paper';
import '@/app/comparar/price.css'

const Price = ({ logo, price, color }: { logo: string; price: string, color: string}) => {
    return (
        <Box className = 'price-layout'>
            <Paper className='price-column'>
                <Box
                    component='img'
                    src={logo}
                    sx={{
                        width: '10vw',
                        height: 'auto',
                        marginTop: '2%',
                    }} />
                <Typography
                    className="price"
                    sx={{
                        color: color,
                        fontSize: '1.0em',
                        fontWeight: 'bold',
                    }}>
                    ${price}
                </Typography>
            </Paper>
        </Box>
    )
}

export default Price