import React, { useState, useEffect } from "react";
import IconMarket from "@/utils/IconMarket";
import IconButton from "@mui/material/IconButton";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import { Box, Card, CardMedia, Paper } from "@mui/material";
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
  const [prodCount, setProdCount] = useState<number>(0);
  const dispatch = useDispatch();
  return (
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
      <Box
        component="img"
        src={
          "https://i5.walmartimages.com/asr/e9ff8590-58ad-44f4-8a74-99aff8a72ea9.1bb69167e16a3d0209eb310e758fcb36.jpeg"
        }
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
            height: 9.54,
            backgroundColor: "#1c1c1c",
            borderRadius: 1,
          }}
        />
        <Box
          sx={{
            display: "flex",
            gap: 5,
          }}
        >
          <Box
            sx={{
              width: 33.8,
              height: 6.24,
              backgroundColor: "#6f6f6f",
              borderRadius: 1,
            }}
          />
          <Box
            sx={{
              width: 33.8,
              height: 6.24,
              backgroundColor: "#6f6f6f",
              borderRadius: 1,
            }}
          />
        </Box>
      </Box>
    </Paper>
  );
};
