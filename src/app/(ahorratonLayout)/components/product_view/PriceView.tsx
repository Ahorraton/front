import React from "react";
import {
  Box,
  Icon,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import "./price_view.css";
import { Product } from "@/app/types/Product";
import LanguageIcon from "@mui/icons-material/Language";
import StoreIcon from "@mui/icons-material/Store";

export default function PriceView({
  key,
  logo,
  product,
  is_cheapest,
}: {
  key: string;
  logo: string;
  product: Product;
  is_cheapest: boolean;
}) {
  const classNameCheapest = is_cheapest
    ? "price-column-cheapest"
    : "price-column";
  const handleClick = (product: Product) => {
    if (product.url) {
      window.open(product.url);
    }
  };

  return (
    <Box className={classNameCheapest}>
      <ListItem disablePadding id={key} key={key} className="price-item-layout">
        <ListItemButton
          onClick={() => handleClick(product)}
          id="list-action-button"
          style={{ cursor: product.url ? "pointer" : "default" }}
        >
          <Box component="img" src={logo} className="price-market-logo" />
          <Box id="price-text-container" className="price-text-container">
            <ListItemText
              id="price-text"
              primary={"$" + product.price.toString()}
              className="price-text"
            />
          </Box>
          <Box id="icon-container" className="icon-container">
            {product.url ? <LanguageIcon /> : <StoreIcon />}
          </Box>
        </ListItemButton>
      </ListItem>
    </Box>
  );
}
