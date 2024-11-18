import React from "react";
import { Box, ListItem, ListItemButton, ListItemText } from "@mui/material";
import "./price_view.css";
import { Product } from "@/app/types/Product";

export default function PriceView({
  key,
  logo,
  product,
  is_cheapest,
  url,
}: {
  key: string;
  logo: string;
  product: Product;
  is_cheapest: boolean;
  url: string | null;
}) {
  const classNameCheapest = is_cheapest
    ? "price-column-cheapest"
    : "price-column";
  const handleClick = (link: string | null) => {
    if (link) {
      window.open(link);
    }
  };

  return (
    <ListItem disablePadding id={key} key={key}>
      <Box className={classNameCheapest}>
        <ListItemButton onClick={() => handleClick(url)}>
          <Box component="img" src={logo} className="price-market-logo" />
          <ListItemText primary={"$" + product.price.toString()} />
        </ListItemButton>
      </Box>
    </ListItem>
  );
}
