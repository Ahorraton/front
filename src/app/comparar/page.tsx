"use client";
import React, { useEffect } from "react";
import { Box, Grid, Button, Typography, CircularProgress } from "@mui/material";
import ProductPaperAle from "@/app/comparar/ProductPaperAle";
import ProductPaper from "@/app/comparar/ProductPaper";
import PageContainer from "@/app/(ahorratonLayout)/components/container/PageContainer";
import { fetch_async } from "@/app/(ahorratonLayout)/async/common/fetch_async";
import Product from "./types/Product";

import "./compare.css";
import { useSearchParams } from "next/navigation";
import ProductCardSearch from "../buscar/cardComponent";
import { useDispatch } from "react-redux";
import { addItem } from "@/redux/store/listSlice";

const LIMIT = 8;

const Compare = () => {
  const [loading, setLoading] = React.useState<boolean>(true);
  const [products, setProducts] = React.useState<Product[]>([]);
  const [error, setError] = React.useState<string | null>(null);
  const [loadMore, setLoadMore] = React.useState<boolean>(false);
  const dispatch = useDispatch();
  const query = useSearchParams().get("query");

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setProducts([]);
    if (query === null) {
      return;
    }

    let uri = "/products_ean/" + query + `?offset=0` + `&limit=${LIMIT}`;

    try {
      const res = await fetch_async(uri);
      console.log("res", res);
      const products_result: Product[] = res.products ? res.products : [];
      setLoading(false);
      setLoadMore(products.length + products_result.length < res.count);
      setProducts([...products, ...products_result]);
      console.log("products_result", products_result);
    } catch (e: unknown) {
      setError("error");
      setLoading(false);
      throw new Error(String(e));
    }
  };

  const fetchMoreProducts = async () => {
    let uri =
      "/products_ean/" +
      query +
      `?offset=${products.length}` +
      `&limit=${LIMIT}`;
    try {
      const res = await fetch_async(uri);
      const products_result: Product[] = res.products ? res.products : [];
      setLoadMore(products.length + products_result.length < res.count);
      setProducts([...products, ...products_result]);
    } catch (e: unknown) {
      setError("error");
      setLoading(false);
      throw new Error(String(e));
    }
  };

  const handleAddProduct = (product: Product) => {
    const productToSave = {
      ...product,
      name: product.names_list,
      quantity: 1,
    };
    dispatch(addItem(productToSave));
  };

  return (
    <PageContainer title="Comparar" description="Compara precios de productos">
      <Box className="compare-layout">
        {loading && (
          <Box className="loading-layout">
            <CircularProgress color="secondary" />
          </Box>
        )}
        {error && (
          <Box className="error-layout">
            <Typography variant="h5" color="error">
              Error al cargar los productos
            </Typography>
            <Typography variant="body1" color="error">
              Por favor intente mas tarde.
            </Typography>
          </Box>
        )}
        <Grid container spacing={2}>
          {products.map((product: Product) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={product.ean}>
              {/* {<ProductPaperAle key={product.ean} product={product} />} */}
              {/* <ProductPaper key={product.ean} product={product} /> */}
              <ProductCardSearch
                product={product}
                addProduct={handleAddProduct}
              />
            </Grid>
          ))}
        </Grid>
        <br />
        {loadMore && (
          <Box display="flex" justifyContent="center">
            <Button
              variant="contained"
              color="secondary"
              onClick={fetchMoreProducts}
            >
              Cargar más
            </Button>
          </Box>
        )}
        {products.length === 0 && !loading && !error && (
          <Box display="flex" justifyContent="center">
            <Typography variant="h5">No se encontraron productos</Typography>
          </Box>
        )}
      </Box>
    </PageContainer>
  );
};

export default Compare;
