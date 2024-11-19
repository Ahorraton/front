import React, { useState } from "react";
import {
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Box,
} from "@mui/material";
import RecipeDetails from "./RecipeDetails";
import { Recipe } from "@/app/types/Recipe";
import "./recipe.css";

export default function RecipePage({ recipes }: { recipes: Recipe[] }) {
  const [selectedRecipe, setSelectedRecipe] = useState<number | null>(null);

  const handleRecipeClick = (recipeId: number) => {
    setSelectedRecipe(recipeId);
  };

  return (
    <Box
      component="div"
      id="recipes-div"
      className="recipes-layout-title-cards"
    >
      <Typography
        variant="h5"
        component="h2"
        gutterBottom
        id="featured-recipes-title"
        className="recipes-titles"
      >
        Featured Recipes
      </Typography>

      <Box component="div" id="recipes-grid-div" className="recipes-grid-div">
        <Grid container spacing={4} id="recipes-grid">
          {recipes.map((recipe) => (
            <Grid item key={recipe.id} xs={12} sm={6} md={4}>
              <Card
                onClick={() => handleRecipeClick(recipe.id)}
                sx={{ cursor: "pointer", textDecoration: "none" }}
              >
                <CardMedia
                  component="img"
                  height="200"
                  image={recipe.img_url}
                  alt={recipe.title}
                />
                <CardContent>
                  <Typography gutterBottom variant="h6" component="div">
                    {recipe.title}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
        {selectedRecipe && (
          <RecipeDetails
            recipeId={selectedRecipe}
            onClose={() => setSelectedRecipe(null)}
            onAddList={() => console.log("Adding to list")}
          />
        )}
      </Box>
    </Box>
  );
}
