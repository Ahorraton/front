import React, { useState, useEffect } from "react";
import IconMarket from "@/utils/IconMarket";
import IconButton from "@mui/material/IconButton";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import {
  Box,
  Card,
  CardActionArea,
  CardMedia,
  Paper,
  Typography,
} from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../../../../redux/store";
import { Product } from "@/app/types/Product";
import "./product_card.css";

const defaultProdImage = "/images/stock_product/default_prod_img.png";

export const FeaturedProductCard = ({
  product,
  onClickSearch,
}: {
  product: Product;
  onClickSearch: (prod_name: string) => void;
}) => {
  const productImg = product.image_url ? product.image_url : defaultProdImage;

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
              {product.name}
            </Typography>
          </Box>
        </Paper>
      </CardActionArea>
    </Box>
  );
};
