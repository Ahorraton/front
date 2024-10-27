import { Box } from "@mui/material";
import React from "react";
import { Recipe } from "./recipeInterface";

const RecipeSlide: React.FC<Recipe> = ({
  title,
  description,
  img_url: image_url,
  ingredients,
}) => {
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
