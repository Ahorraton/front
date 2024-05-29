"use client"
import { useState } from "react";

import { fetch_async } from './async/common/fetch_async'
import PageContainer from '@/app/(ahorratonLayout)/components/container/PageContainer';
import SearchBar from "./layout/SearchBar";
import Product from './components/types/Product'

import { Box, Button, Typography, Grid } from "@mui/material";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';


const IMAGE = "https://i5.walmartimages.com/asr/e9ff8590-58ad-44f4-8a74-99aff8a72ea9.1bb69167e16a3d0209eb310e758fcb36.jpeg";

export default function Home() {
  const [error, setError] = useState<string | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const handleClick = async () => {
    const params = new URLSearchParams(window.location.search);
    if (searchQuery) {
      params.set('q', searchQuery);
    } else {
      params.delete('q');
    }

    const product_searched = params.toString().split('=')[1];

    if (product_searched != undefined) {
      
      let endpoint_url =  '/products/' + searchQuery + '?offset=0' + '&limit=10';
    
      try{
        const res = await fetch_async(endpoint_url);
        const products_result : Product[] = res.products;
        console.log(products_result);
        setProducts(products_result);
      } catch(e:unknown){
        setError("error");
        throw new Error(String(e))
      }
    }
  };

  return (
    <PageContainer title="Ahorraton" description="Ahorra en grande">
      <Box alignContent={"center"} alignItems={"center"}>
        <Typography variant="h1" align="center" gutterBottom>
          Ahorraton 🐭
        </Typography>
      
        <SearchBar set={setSearchQuery} handleSearch={handleClick}/>
        <br/>
        <Box>
          <Grid container spacing={2}>
            {products.map(product => (
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
                  </CardContent>
                  <CardActions>
                    <Box display='flex' justifyContent='space-around'>
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
        </Box>
      </Box>
    </PageContainer>
  );
}