"use client"
import React, { useEffect } from "react";
import { Box } from "@mui/material";
import ProductRow from "./ProductRow";
import PageContainer from "../(ahorratonLayout)/components/container/PageContainer";
import Product from "../(ahorratonLayout)/components/types/Product";
import { fetch_async } from "../(ahorratonLayout)/async/common/fetch_async";

import "./compare.css";

const Compare = () => {
    const [loading, setLoading] = React.useState<boolean>(true);
    const [products, setProducts] = React.useState<Product[]>([]);
    const [error, setError] = React.useState<string | null>(null);

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

    console.log(products);

    return (
        <PageContainer title="Comparar" description="Compara precios de productos">
            <Box className = "compare-layout">
                <ProductRow />
                <ProductRow />
                <ProductRow />
            </Box>
        </PageContainer>
    );
}

export default Compare;