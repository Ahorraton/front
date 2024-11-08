import axios from "axios";
import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  CircularProgress,
} from "@mui/material";

import { addItems } from "../../redux/store/listSlice";
import { useSelector, useDispatch } from "react-redux";
import { fetch_async } from "../../utils/common/fetch_async";
import { Recipe } from "../types/Recipe";

interface RecipeDetailsProps {
  recipeId: number;
  onClose: () => void;
  onAddList: () => void;
}

const RecipeDetails: React.FC<RecipeDetailsProps> = ({ recipeId, onClose }) => {
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const res = await fetch_async(`/recipes/${recipeId}`);
        setLoading(false);
        const recipe: Recipe = res.recipe ? res.recipe : null;
        setRecipe(recipe);
      } catch (e: unknown) {
        setError("error loading recipe");
        throw new Error(String(e));
      }
    };
    fetchRecipe();
  }, [recipeId]);

  const onAddList = () => {
    dispatch(
      addItems(
        recipe?.ingredients.map((ingredient, index) => ({
          name: ingredient.name,
          quantity: index + 1,
          ean: String(ingredient.id),
        })) || []
      )
    );
  };

  return (
    <Dialog
      open={true}
      onClose={onClose}
      aria-labelledby="recipe-dialog-title"
      id="recipe-details-dialog"
    >
      <DialogTitle id="recipe-dialog-title">
        {loading ? "Loading Recipe..." : recipe?.title}
      </DialogTitle>
      <DialogContent>
        {loading ? (
          <CircularProgress />
        ) : error ? (
          <Typography color="error">{error}</Typography>
        ) : recipe ? (
          <>
            <Typography variant="h6" gutterBottom>
              Ingredients:
            </Typography>
            <ul>
              {recipe.ingredients.map((ingredient, index) => (
                <li key={index}>{ingredient.name}</li>
              ))}
            </ul>
          </>
        ) : null}
      </DialogContent>
      <DialogActions>
        <Button
          onClick={onAddList}
          color="secondary"
          id="recipe-dialog-add-to-list-button"
        >
          Add to list
        </Button>
        <Button
          onClick={onClose}
          color="primary"
          id="recipe-dialog-close-button"
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default RecipeDetails;
