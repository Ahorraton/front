import React from "react";
import { List } from "@mui/material";
import ProductItem from "./ProductItem";
import { Product } from "../types/Product";

type ProductListProps = {
  products: Product[];
};

const ProductList: React.FC<ProductListProps> = ({ products }) => {
  return (
    <List>
      {products.map((product) => (
        <ProductItem key={product.id} product={product} />
      ))}
    </List>
  );
};

export default ProductList;
