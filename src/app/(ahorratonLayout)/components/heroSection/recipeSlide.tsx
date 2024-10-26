import { Box } from "@mui/material";
import React from "react";
import { Recipe } from "./recipeInterface";

const RecipeSlide: React.FC<Recipe> = ({
  title,
  description,
  img_url: image_url,
  ingredients,
}) => {
  console.log(image_url);
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
          src={image_url}
          maxWidth="800px"
          maxHeight="600px"
        ></Box>
      </Box>
      <Box>
        <h3>{title}</h3>
        <p>{description}</p>
        <ul>
          {ingredients.map((ingredient) => (
            <li>
              {ingredient.name} ({ingredient.amount})
            </li>
          ))}
        </ul>
      </Box>
    </Box>
  );
};

export default RecipeSlide;
