import { Card, CardActionArea, CardContent, Link } from "@mui/material";
import React from "react";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import "./recipe.css";

export default function GoToAllRecipesItem() {
  return (
    <Card id="see-more-recipes-card" className="featured-recipe-card">
      <Link
        href="/recipes"
        underline="none"
        sx={{ color: "inherit", display: "block" }}
      >
        <CardActionArea
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
      </Link>
    </Card>
  );
}
