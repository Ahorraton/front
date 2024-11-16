import React from "react";
import { Box, ListItem, ListItemButton, ListItemText } from "@mui/material";
import "./price_view.css";

export default function PriceView({
  index,
  logo,
  price,
  cheapest,
  url,
}: {
  index: number;
  logo: string;
  price: string;
  cheapest: boolean;
  url: string | undefined;
}) {
  const classNameCheapest = cheapest ? "price-column-cheapest" : "price-column";
  const handleClick = (link: string | undefined) => {
    window.open(link, "_blank");
  };

  return (
    <ListItem disablePadding id={logo + price} key={index}>
      <Box className={classNameCheapest}>
        <ListItemButton onClick={() => handleClick(url)}>
          <Box component="img" src={logo} className="price-market-logo" />
          <ListItemText primary={price} />
        </ListItemButton>
      </Box>
    </ListItem>
  );
}
