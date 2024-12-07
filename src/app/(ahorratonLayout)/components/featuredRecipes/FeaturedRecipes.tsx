import { Recipe } from "@/app/types/Recipe";
import { Grid, Box, Typography } from "@mui/material";
import { RecipeCard } from "./RecipeCard";
import "./recipe.css";
import GoToAllRecipesItem from "./GoToAllRecipesItem";

const FeaturedRecipes = ({ recipes }: { recipes: Recipe[] }) => {
  return (
    <Box
      id="featured-recipes-title-div"
      className="featured-recipe-title-layout"
    >
      <Typography variant="h4">Recetas Destacadas</Typography>
      <Box id="featured-recipes" className="featured-recipe-layout">
        <Grid container spacing={4}>
          {recipes.slice(0, 5).map((recipe, index) => (
            <Grid item key={index} xs={12} sm={6} md={4}>
              <RecipeCard
                recipe={recipe}
                onClick={() => (window.location.href = `/recipes/?recipeId=${recipe.id}`)}
              />
            </Grid>
          ))}
          <Grid item key={"last_recipe"} xs={12} sm={6} md={4}>
            <GoToAllRecipesItem />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default FeaturedRecipes;
