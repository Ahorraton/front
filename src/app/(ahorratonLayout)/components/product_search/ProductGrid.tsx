import React from "react";
import { Box, Grid, Paper, Typography } from "@mui/material";
import { Product } from "@/app/types/Product";
import { FeaturedProductCard } from "./FeaturedProductCard";

const FeaturedProducts = ({
  products,
  setSelectedFeaturedProduct,
}: {
  products: Product[];
  setSelectedFeaturedProduct: (prod_name: string) => void;
}) => {
  const handleOnClickSearch = (prod_name: string) => {
    setSelectedFeaturedProduct(prod_name);
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Categorias Destacadas{" "}
      </Typography>
      <Grid container spacing={4}>
        {products.slice(0, 12).map((product, index) => (
          <Grid item key={index}>
            <FeaturedProductCard
              product={product}
              onClickSearch={handleOnClickSearch}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default FeaturedProducts;
