import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import Product from "../types/Product";
import ProductCard from "./ProductCard";
import { addItem } from "@/redux/store/listSlice";
import { useDispatch } from "react-redux";

const FeaturedProducts = ({ products }: { products: Product[] }) => {
  const dispatch = useDispatch();

  const handleAddProduct = (product: Product) => {
    const productToSave = {
      ean: String(product.id),
      name: product.name,
      quantity: 1,
    };
    dispatch(addItem(productToSave));
  };

  const handleOnClickSearch = (prod_name: string) => {
    console.log("Buscando producto: ", prod_name);
  };

  return (
    <Box py={4} p={4}>
      <Typography variant="h4" gutterBottom>
        Featured Products
      </Typography>
      <Grid container spacing={2}>
        {products.map((product) => (
          <Grid item key={product.id} xs={12} sm={6} md={4} lg={4}>
            <ProductCard
              product={product}
              addProduct={handleAddProduct}
              onClickSearch={handleOnClickSearch}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default FeaturedProducts;
