import { Box } from "@mui/material";
import React from "react";
import { Recipe } from "../types/Recipe";
import { RecipeDescription } from "./recipeDescription";

const RecipeSlide: React.FC<Recipe> = (recipe) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center",
      }}
    >
      <Box>
        <Box
          component="img"
          src={recipe.img_url}
          sx={{
            objectFit: "cover",
            width: "100%",
            height: "50vh",
            maxWidth: {
              xs: "50vw",
            },
            borderRadius: "10px",
          }}
        ></Box>
      </Box>
      <Box
        sx={{
          textAlign: "center",
        }}
      >
        <RecipeDescription {...recipe} />
      </Box>
    </Box>
  );
};

export default RecipeSlide;
