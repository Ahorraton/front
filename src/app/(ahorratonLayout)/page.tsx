"use client"
import { useEffect, useState } from "react";

import { fetch_async } from './async/common/fetch_async'
import PageContainer from '@/app/(ahorratonLayout)/components/container/PageContainer';
import SearchBar from "./layout/SearchBar";
import Product from './components/types/Product'
import './landing_page.css'

import { Box, Typography } from "@mui/material";
import ProductGrid from "./components/general/ProductGrid";



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

    const product_searched: string | undefined = params.toString().split('=')[1];

    if (product_searched != undefined) {
      
      let endpoint_url =  '/products/' + searchQuery + '?offset=0' + '&limit=100';
    
      try{
        const res = await fetch_async(endpoint_url);
        const products_result : Product[] = res.products;
        setProducts(products_result);

        if(products_result.length === 0){
          setError("Empty List")
        }

      } catch(e:unknown){
        setError("error");
        throw new Error(String(e))
      }
    }
  };

  useEffect(() => {
    if (searchQuery.length === 0){
      setProducts([])
      setError(null)
    }
  }, [searchQuery]);

  return (
    <PageContainer title="Ahorraton" description="Ahorra en grande">
      <Box className='page-layout'>
        <Typography variant="h1" align="center" gutterBottom>
          Ahorratón 🐭
        </Typography>
      
        <SearchBar set={setSearchQuery} handleSearch={handleClick}/>
        <br/>
        <Box>
          {products.length === 0 && error ? (
            <Typography variant="h6" align="center">No products available</Typography>
          ) : (
            <ProductGrid products={products}/>
          )}
        </Box>
      </Box>
    </PageContainer>
  );
}