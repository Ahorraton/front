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
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../redux/store";
import { addItem, removeItem } from "../../../../redux/store/listSlice";
import Product from "../types/Product";
import "./product_card.css";

export const FeaturedProductCard = ({
  product,
  onClickSearch,
}: {
  product: Product;
  onClickSearch: (prod_name: string) => void;
}) => {
  const list = useSelector((state: RootState) => state.list.items);

  product.image_url =
    "https://i5.walmartimages.com/asr/e9ff8590-58ad-44f4-8a74-99aff8a72ea9.1bb69167e16a3d0209eb310e758fcb36.jpeg";

  return (
    <Card
      key={product.id}
      sx={{
        height: "100%",
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        borderRadius: "30px",
        justifyContent: "space-between",
      }}
    >
      <CardActionArea
        onClick={() => onClickSearch(product.name)}
        sx={{
          flexGrow: 1,
          borderBottomLeftRadius: "0px",
          borderBottomRightRadius: "0px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <Paper
          elevation={3}
          sx={{
            width: 126,
            height: 182,
            borderRadius: 2,
            position: "relative",
            backgroundColor: "#dbdbdb",
          }}
        >
          {product.image_url !== null ? (
            <Box
              component="img"
              src={product.image_url}
              alt={`Featured Product: ${product.name}`}
              sx={{
                width: 94,
                height: 94,
                position: "relative",
                top: "10%",
                left: 16,
                alignItems: "center",
                borderRadius: "50%",
                border: "2px solid #1c1c1c",
                overflow: "hidden",
                objectFit: "cover",
              }}
            />
          ) : (
            <Box
              component="img"
              sx={{
                width: 94,
                height: 94,
                position: "relative",
                top: "10%",
                left: 16,
                alignItems: "center",
                borderRadius: "50%",
                border: "2px solid #1c1c1c",
                overflow: "hidden",
                objectFit: "cover",
                backgroundColor: "#ffffff",
              }}
            />
          )}
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
          >
            <Box
              sx={{
                width: 101.47,
                height: 20,
                backgroundColor: "#1c1c1c",
                borderRadius: 1,
              }}
            >
              <Typography sx={{ textAlign: "center", color: "white" }}>
                {product.name}
              </Typography>
            </Box>
          </Box>
        </Paper>
      </CardActionArea>
    </Card>
  );
};
