import React from "react";
import { Box, ListItem, ListItemButton, ListItemText } from "@mui/material";
import "./price_view.css";

export default function PriceView({
  logo,
  price,
}: {
  logo: string;
  price: string;
}) {
  return (
    <ListItem disablePadding id={logo + price}>
      <ListItemButton>
        <Box component="img" src={logo} className="price-market-logo" />
        <ListItemText primary={price} />
      </ListItemButton>
    </ListItem>
  );
}
