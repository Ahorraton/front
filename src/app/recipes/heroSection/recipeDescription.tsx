import { Box } from "@mui/material";
import { Recipe } from "@/app/types/Recipe";

export const RecipeDescription: React.FC<Recipe> = ({
  title,
  description,
  ingredients,
}) => {
  return (
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
  );
};
