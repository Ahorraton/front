import { Box } from "@mui/material";
import { Recipe } from "@/app/types/Recipe";

export const RecipeDescription: React.FC<Recipe> = ({
  id,
  title,
  description,
  ingredients,
}) => {
  return (
    <Box id={id.toString()}>
      <h3>{title}</h3>
      <p>{description}</p>
      <ul>
        {ingredients.map((ingredient) => (
          <li key={ingredient.name + id.toString()}>
            {ingredient.name} ({ingredient.amount})
          </li>
        ))}
      </ul>
    </Box>
  );
};
