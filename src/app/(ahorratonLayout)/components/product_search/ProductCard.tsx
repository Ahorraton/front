import React, { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import { Card, CardMedia, CardContent } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../redux/store";
import { addItem, removeItem } from "../../../../redux/store/listSlice";
import Product from "../types/Product";
import "./product_card.css";

const ProductCard = ({ product }: { product: Product }) => {
  const list = useSelector((state: RootState) => state.list.items);
  const [prodCount, setProdCount] = useState<number>(0);
  const dispatch = useDispatch();

  useEffect(() => {
    const item = list.find((item) => item.id === product.id.toString());
    if (item) {
      setProdCount(item.quantity);
    } else {
      setProdCount(0);
    }
  }, [list, product.id]);

  const handleAddItem = () => {
    setProdCount(prodCount + 1);
    dispatch(
      addItem({
        id: product.id.toString(),
        name: product.name,
        quantity: 1,
        price: product.price,
      })
    );
  };

  const handleRemoveItem = () => {
    if (prodCount > 0) {
      setProdCount(prodCount - 1);
      dispatch(removeItem(product.id.toString()));
    }
  };

  const marketImage = () => {
    if (product.image_url) {
      return product.image_url;
    }

    switch (product.market) {
      case "disco":
        return "/images/logos/logo_disco.svg";
      case "carrefour":
        return "/images/logos/logo_carrefour.svg";
      case "jumbo":
        return "/images/logos/logo_jumbo.png";
      case "dia":
        return "/images/logos/logo_dia.svg";
      case "vea":
        return "/images/logos/logo_vea.png";
      case "coto":
        return "/images/logos/logo_coto.svg";
      default:
        return "https://i5.walmartimages.com/asr/e9ff8590-58ad-44f4-8a74-99aff8a72ea9.1bb69167e16a3d0209eb310e758fcb36.jpeg";
    }
  };

  return (
    <Card sx={{ maxWidth: 350, width: "100%", margin: "auto" }}>
      <CardContent className="product-row">
        <Typography variant="h5">
          {product.market.charAt(0).toUpperCase() + product.market.slice(1)}
        </Typography>
      </CardContent>
      <CardMedia component="img" alt={product.name} image={marketImage()} />
      <CardContent className="product-row">
        <Typography gutterBottom variant="h5" component="div">
          {product.name}
        </Typography>
      </CardContent>
      <Box className="product-row">
        <Typography variant="h4" component="div">
          ${product.price}
        </Typography>
        <Box display="flex" flexDirection="row" alignItems="center">
          {/* <IconButton color="primary" aria-label="remove from shopping list" onClick={handleRemoveItem}>
                        <RemoveCircleIcon />
                    </IconButton>
                    <Typography variant="h6" component="div">
                        {prodCount}
                    </Typography> */}
          {/* <IconButton color="primary" aria-label="add to shopping list" onClick={handleAddItem}>
                        <AddCircleIcon />
                    </IconButton> */}
        </Box>
      </Box>
    </Card>
  );
};

export default ProductCard;
