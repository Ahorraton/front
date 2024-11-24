import React from "react";
import { Grid } from "@mui/material";
import ProductItem from "./ProductItem";
import { Product } from "../types/Product";
import './myList.css';

type ProductListProps = {
  products: Product[];
};

const ProductList: React.FC<ProductListProps> = ({ products }) => {
  return (
    <Grid container spacing={2} py={8}>
      {products.map((product) => (
        <ProductItem key={product.id} product={product} />
      ))}
    </Grid>
  );
};

export default ProductList;
