"use client"
import React from "react"
import { Box } from "@mui/material"
import Paper from '@mui/material/Paper';
import '@/app/comparar/price-luis.css'

const PriceLuis = ({ logo, selected }: { logo: string; selected: Boolean}) => {
    const className = selected ? 'price-column-selected' : 'price-column';
    console.log('selected', selected);
    return (
        <Box className = 'price-layout'>
            <Paper className={className}>
                <Box
                    component='img'
                    src={logo}
                    sx={{
                        maxHeight: '10vh',
                    }} />
            </Paper>
        </Box>
    )
}

export default PriceLuis