import React from "react";
import { Box, CardActionArea, Paper, Typography } from "@mui/material";
import { Product } from "@/app/types/Product";
import "./product_card.css";

const DEFAULT_PROD_IMG = "/images/stock_product/rat.png";

export const FeaturedProductCard = ({
  product,
  onClickSearch,
}: {
  product: Product;
  onClickSearch: (prod_name: string) => void;
}) => {
  const productImg = product.image_url ? product.image_url : DEFAULT_PROD_IMG;

  return (
    <Box
      key={product.id}
      className="featured-product-card"
      id="featured-product-card-style"
    >
      <CardActionArea
        onClick={() => onClickSearch(product.name)}
        className="featured-product-card-action-area"
        id="featured-product-action-area"
      >
        <Paper elevation={3} className="featured-product-card-paper">
          <Box
            component="img"
            className="featured-product-image"
            id="featured-product-image"
            src={productImg}
            onError={(e) => {
              e.currentTarget.src = DEFAULT_PROD_IMG;
            }}
            alt={`Featured Product: ${product.name}`}
          />

          <Box
            className="featured-product-title-container"
            id="featured-product-title-container"
          >
            <Typography
              className="featured-product-title"
              id="featured-product-title"
            >
              <strong>{product.name}</strong>
            </Typography>
          </Box>
        </Paper>
      </CardActionArea>
    </Box>
  );
};
