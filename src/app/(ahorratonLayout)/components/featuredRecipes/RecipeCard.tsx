import { Recipe } from "@/app/types/Recipe";
import {
  Card,
  CardMedia,
  Stack,
  Typography,
  Rating,
  Box,
  CardActionArea,
} from "@mui/material";
import "./recipe.css";

const DEFAULT_RECIPE_IMG = "/images/stock_product/rat.png";

export const RecipeCard = ({
  recipe,
  onClick,
}: {
  recipe: Recipe;
  onClick: () => void;
}) => {
  return (
    <Card>
      <CardActionArea onClick={onClick} className="featured-recipe-card">
        <CardMedia
          component="img"
          className="featured-recipe-card-image"
          alt={recipe.title}
          image={recipe.img_url ?? DEFAULT_RECIPE_IMG}
        />
        <Stack
          id="featured-recipe-root-stack"
          className="featured-recipe-title"
          direction="row"
          alignItems="center"
          spacing={3}
          p={2}
          useFlexGap
        >
          <Stack direction="column" spacing={0.5} useFlexGap>
            <Stack direction="row" spacing={1} useFlexGap>
              <Typography variant="h6">{recipe.title}</Typography>
            </Stack>
          </Stack>
        </Stack>
      </CardActionArea>
    </Card>
  );
};
