"use client"
import React, { useEffect } from "react";
import { Box, Skeleton, Typography } from "@mui/material";
import { Grid } from '@mui/material';
import PageContainer from '@/app/(ahorratonLayout)/components/container/PageContainer';
import Product from '@/app/(ahorratonLayout)/components/types/Product';
import { fetch_async } from '@/app/(ahorratonLayout)/async/common/fetch_async';
import ProductGrid from '@/app/(ahorratonLayout)/components/product_search/ProductGrid';
import './landing_page.css'



export default function Home() {
  const [loading, setLoading] = React.useState<boolean>(true);
  const [products, setProducts] = React.useState<Product[]>([]);
  const [error, setError] = React.useState<string | null>(null);

  const skeletonGridItems = Array.from({ length: 8 }, (_, i) => (
    <Grid item key={i} xs={12} sm={6} md={4} lg={3}>
      <Skeleton variant="rounded" animation='wave' height={350} width={280} />
    </Grid>
  ));

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch_async('/products/' + 'yerba' + '?offset=0' + '&limit=8');
        const products_result : Product[] = res.products ? res.products : [];
        setProducts(products_result);
        setLoading(false);
      } catch (e: unknown) {
        setError("error");
        throw new Error(String(e));
      }
    };

    fetchProducts();
  }
  , []);

  return (
    <PageContainer title="Ahorraton" description="Ahorra en grande">
      <Box className='page-layout'>
      {
        loading ? (
          <Grid container spacing={2}>
            {skeletonGridItems}
          </Grid>
        ) : (
          products.length === 0 ? (
            <Typography variant="h6" align="center">No se encontraron productos.</Typography>
          ) : (
            <ProductGrid products={products}/>
          )
        )
      }
      </Box>
    </PageContainer>
  );
};
