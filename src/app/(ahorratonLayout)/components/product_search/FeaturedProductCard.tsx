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
import Product from "../types/Product";
import "./product_card.css";

const defaultProdImage = "/images/stock_product/default_prod_img.png";

export const FeaturedProductCard = ({
  product,
  onClickSearch,
}: {
  product: Product;
  onClickSearch: (prod_name: string) => void;
}) => {
  const list = useSelector((state: RootState) => state.list.items);
  const productImg = product.image_url ? product.image_url : defaultProdImage;

  return (
    <Card
      key={product.id}
      className="product-card"
      id="featured-product-card-style"
    >
      <CardActionArea
        onClick={() => onClickSearch(product.name)}
        className="product-card-action-area"
        id="featured-product-action-area"
      >
        <Paper elevation={3} className="product-card-paper">
          <Box
            component="img"
            className="featured-product-image"
            id="featured-product-image"
            src={productImg}
            alt={`Featured Product: ${product.name}`}
          />

          <Box
            sx={{
              position: "absolute",
              top: 128,
              left: 9,
              width: 107,
              height: 41,
              display: "flex",
              flexDirection: "column",
              gap: 1.5,
            }}
            id="featured-product-title-container"
          >
            <Box
              sx={{
                width: 101.47,
                height: 20,
                backgroundColor: "#1c1c1c",
                borderRadius: 1,
              }}
              id="featured-product-title-background"
            >
              <Typography
                className="featured-product-title"
                id="featured-product-title"
              >
                {product.name}
              </Typography>
            </Box>
          </Box>
        </Paper>
      </CardActionArea>
    </Card>
  );
};
