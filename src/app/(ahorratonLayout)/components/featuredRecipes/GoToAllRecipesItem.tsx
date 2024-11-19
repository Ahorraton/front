import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Icon,
} from "@mui/material";
import React from "react";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import "./recipe.css";

export default function GoToAllRecipesItem() {
  return (
    <Card id="see-more-recipes-card">
      <CardActionArea
        onClick={() => console.log("Hello")}
        id="see-more-recipes-action-card"
        sx={{
          flexGrow: 1,
          borderBottomLeftRadius: "0px",
          borderBottomRightRadius: "0px",
        }}
      >
        <CardContent
          id="see-more-recipes-card-content"
          className="see-more-recipes"
        >
          <MenuBookIcon />
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
