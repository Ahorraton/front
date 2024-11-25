import React, { useEffect, useState } from "react";
import {
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Box,
} from "@mui/material";
import RecipeDetails from "./RecipeDetails";
import { Recipe, RecipeFromDB } from "@/app/types/Recipe";
import { addItems } from "../../redux/store/listSlice";
import { useDispatch } from "react-redux";
import { fetch_async } from "../../utils/common/fetch_async";
import "./recipe.css";
import { Item } from "../types/Ingredient";
import SelectedItemAlert from "../comparar/selectedItemAlert";
import MetaDataContainer from "../global_layout/MetaDataContainer";

export default function RecipePage({ recipes }: { recipes: Recipe[] }) {
  const [selectedRecipeId, setSelectedRecipeId] = useState<number | null>(null);
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loadingSelectedRecipe, setSelectedLoading] = useState(true);
  const [errorLoadingRecipe, setErrorLoadingRecipe] = useState<string | null>(
    null
  );

  const [showAlert, setShowAlert] = useState<Boolean>(false);

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchRecipe = async () => {
      if (selectedRecipeId) {
        try {
          const res: RecipeFromDB = await fetch_async(
            `/recipes/${selectedRecipeId}`
          );

          if (res.recipe) {
            setSelectedLoading(false);
            setShowAlert(false);
            setRecipe(res.recipe);
          }
        } catch (e: unknown) {
          setErrorLoadingRecipe(`Error loading recipe: ${e}`);
        }
      } else {
        setSelectedLoading(true);
        setRecipe(null);
      }
    };
    fetchRecipe();
  }, [selectedRecipeId]);

  const onAddList = () => {
    console.log("Adding to list");
    if (!recipe) {
      console.error("No recipe selected");
      return;
    }

    console.log("Adding products", recipe.items);
    console.log("adding to list");
    setShowAlert(true);
    dispatch(
      addItems(
        recipe.items.map((i: Item) => ({
          name: i.name,
          amount: i.amount,
          ean: i.ean,
        }))
      )
    );
  };

  return (
    <MetaDataContainer title="Recipes" description="Recetas Disponibles">
      <Typography
        variant="h5"
        component="h2"
        gutterBottom
        id="featured-recipes-title"
        className="recipes-titles"
      >
        Featured Recipes
      </Typography>

      <Box className="recipe-layout">
        <Grid container spacing={4} id="recipes-grid" className="recipes-grid">
          {recipes.map((recipe) => (
            <Grid item key={recipe.id} xs={12} sm={6} md={4}>
              <Card
                id={`recipe-card-${recipe.id}`}
                onClick={() => setSelectedRecipeId(recipe.id)}
                className="recipe-card"
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

        {showAlert && (
          <Box className="alert-box" id="alert-box">
            <SelectedItemAlert setShowAlert={setShowAlert} />
          </Box>
        )}

        {recipe && (
          <RecipeDetails
            recipe={recipe}
            loading={loadingSelectedRecipe}
            error={errorLoadingRecipe}
            onClose={() => {
              setSelectedRecipeId(null);
              setRecipe(null);
            }}
            onAddList={onAddList}
          />
        )}
      </Box>
    </MetaDataContainer>
  );
}
