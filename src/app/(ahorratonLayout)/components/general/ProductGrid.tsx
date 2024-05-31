
import React from 'react';
import { Box } from '@mui/material';
import { Grid, Card, CardMedia, CardContent } from '@mui/material';
import { CardActions, Button, Typography } from '@mui/material';
import Product from '../types/Product';

const IMAGE = "https://i5.walmartimages.com/asr/e9ff8590-58ad-44f4-8a74-99aff8a72ea9.1bb69167e16a3d0209eb310e758fcb36.jpeg";


const ProductGrid = ({ products } : { products: Product[] }) => {

    return(
        <Grid container spacing={2}>
            {products.map((product) => (
                <Grid item key={product.id} xs={12} sm={10} md={4} lg={3}>
                    <Card sx={{ maxWidth: 350, width: '100%', margin: 'auto' }}>
                        <CardMedia
                            component="img"
                            alt={product.name}
                            height="200%"
                            width="100%"
                            image={IMAGE}
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                {product.name}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {product.market}
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Box display="flex" justifyContent="space-around">
                                <Button size="small">Agregar a carrito</Button>
                                <Typography variant="h6" component="div">
                                    ${product.price}
                                </Typography>
                            </Box>
                        </CardActions>
                    </Card>
                </Grid>
            ))}
        </Grid>
    )
};

export default ProductGrid;