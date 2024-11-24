import React from "react";
import { Box, ListItem, ListItemButton, ListItemText } from "@mui/material";
import "./price_view.css";
import { Product } from "@/app/types/Product";

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
        >
          <Box component="img" src={logo} className="price-market-logo" />
          <Box id="price-text-container" className="price-text-container">
            <ListItemText
              id="price-text"
              primary={"$" + product.price.toString()}
              className="price-text"
            />
          </Box>
        </ListItemButton>
      </ListItem>
    </Box>
  );
}
