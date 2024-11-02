import React from "react";
import { Grid } from "@mui/material";
import Product from "../types/Product";
import ProductCard from "./ProductCard";

const FeaturedProducts = ({ products }: { products: Product[] }) => {
  return (
    <Grid container spacing={2}>
      {products.map((product) => (
        <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
          <ProductCard product={product} />
        </Grid>
      ))}
    </Grid>
  );
};

export default FeaturedProducts;
