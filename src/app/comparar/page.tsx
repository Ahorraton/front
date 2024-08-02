"use client"
import React, { useEffect } from "react";
import { Box, Grid } from "@mui/material";
import ProductPaperAle from "@/app/comparar/ProductPaperAle";
import ProductPaper from "@/app/comparar/ProductPaper";
import PageContainer from "@/app/(ahorratonLayout)/components/container/PageContainer";
import { fetch_async } from "@/app/(ahorratonLayout)/async/common/fetch_async";
import Product from "./types/Product";

import "./compare.css";
import { useSearchParams } from "next/navigation";

const LIMIT = 8;

const Compare = () => {
    const [loading, setLoading] = React.useState<boolean>(true);
    const [products, setProducts] = React.useState<Product[]>([]);
    const [error, setError] = React.useState<string | null>(null);
    
    const query = useSearchParams().get('query');
  
    useEffect(() => {
        fetchProducts();
      }
    , []);
    
    const fetchProducts = async () => {
      setProducts([]);
      if (query === null){
          return;
      }

      let uri = '/products_ean/' + query + `?offset=0` + `&limit=${LIMIT}`;

      try {
        const res = await fetch_async(uri);
        const products_result : Product[] = res.products ? res.products : [];
        setProducts(products_result);
        setLoading(false);
      } catch (e: unknown) {
        setError("error");
        throw new Error(String(e));
      }
    };

    return (
        <PageContainer title="Comparar" description="Compara precios de productos">
            <Box className = "compare-layout">
                {loading && <p>Cargando...</p>}
                {error && <p>Error</p>}
                <Grid container spacing={2}>
                  {products.map((product: Product) => (
                    <Grid item key={product.ean} xs={12} sm={6} md={6} lg={6}>
                      <ProductPaperAle key={product.ean} product={product} />
                      {/* <ProductPaper key={product.ean} product={product} /> */}
                    </Grid>
                  ))}
                </Grid>
            </Box>
        </PageContainer>
    );
}

export default Compare;