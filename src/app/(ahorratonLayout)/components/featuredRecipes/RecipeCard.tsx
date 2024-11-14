import { Recipe } from "@/app/types/Recipe";
import { Card, CardMedia, Stack, Typography, Rating } from "@mui/material";
import "./recipe.css";

export const RecipeCard = ({ recipe }: { recipe: Recipe }) => {
  return (
    <Card className="featured-recipe-card">
      <CardMedia component="img" alt={recipe.title} image={recipe.img_url} />
      <Stack direction="row" alignItems="center" spacing={3} p={2} useFlexGap>
        <Stack direction="column" spacing={0.5} useFlexGap>
          <Stack direction="row" spacing={1} useFlexGap>
            {/* <Chip
              size="small"
              label={active ? "Active" : "Inactive"}
              color={active ? "success" : "default"}
            /> */}
            <Rating defaultValue={4} size="small" />
          </Stack>
        </Stack>
        {/* <Switch checked={active} /> */}
      </Stack>
    </Card>
  );
};
