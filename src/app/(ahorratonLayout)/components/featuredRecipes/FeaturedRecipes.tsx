import { Recipe } from "@/app/types/Recipe";
import { Grid, Box, Typography } from "@mui/material";
import { RecipeCard } from "./RecipeCard";

const FeaturedRecipes = ({ recipes }: { recipes: Recipe[] }) => {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Recetas Destacadas{" "}
      </Typography>
      <Grid container spacing={4}>
        {recipes.slice(0, 3).map((recipe, index) => (
          <Grid item key={index}>
            <RecipeCard recipe={recipe} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default FeaturedRecipes;
