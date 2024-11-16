import React from "react";
import { Box, ListItem, ListItemButton, ListItemText } from "@mui/material";
import "./price_view.css";

export default function PriceView({
  key,
  logo,
  price,
  cheapest,
  url,
}: {
  key: string;
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
    <ListItem disablePadding id={key} key={key}>
      <Box className={classNameCheapest}>
        <ListItemButton onClick={() => handleClick(url)}>
          <Box component="img" src={logo} className="price-market-logo" />
          <ListItemText primary={"$" + price} />
        </ListItemButton>
      </Box>
    </ListItem>
  );
}
