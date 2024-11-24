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

import { Recipe } from "../types/Recipe";

interface RecipeDetailsProps {
  recipe: Recipe;
  loading: boolean;
  error: string | null;
  onClose: () => void;
  onAddList: () => void;
}

const RecipeDetails: React.FC<RecipeDetailsProps> = ({
  recipe,
  loading,
  error,
  onClose,
  onAddList,
}) => {
  console.log("Inside recipe", recipe);
  console.log("Items", recipe.items);
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
          <Typography color="error">{`Error Loading Recipe Details: ${error}`}</Typography>
        ) : (
          <>
            <Typography variant="h6" gutterBottom>
              Ingredients:
            </Typography>
            <ul>
              {recipe.items?.map((item, index) => (
                <li key={index}>{item.name}</li>
              ))}
            </ul>
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
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default RecipeDetails;
