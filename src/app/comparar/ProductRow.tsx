"use client"
import React, { useEffect } from "react";
import { Box, Button, Paper, Typography } from "@mui/material";
import "./compare.css";


const ProductRow = () => {
    return (
        <Paper className = 'card-layout'>
            <Box className = 'product-layout'>
                <Typography justifyContent='center' align='center' variant="h1">
                    Product Name
                </Typography>
                <Box className = 'product-row'>
                    <Box>
                        <Typography>
                            Imagen
                        </Typography>
                    </Box>
                    <Box className = 'market-row'>
                        <Typography variant="h2">
                            Coto
                        </Typography>
                        <Typography variant="h2">
                            Vea
                        </Typography>
                        <Typography variant="h2">
                            Carrefour
                        </Typography>
                        <Typography variant="h2">
                            Disco
                        </Typography>
                        <Typography variant="h2">
                            Dia
                        </Typography>
                        <Typography variant="h2">
                            Jumbo
                        </Typography>
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