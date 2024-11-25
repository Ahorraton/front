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
  Box,
  Grid,
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
  return (
    <Dialog
      open={recipe !== null}
      onClose={onClose}
      aria-labelledby="recipe-dialog-title"
      id="recipe-details-dialog"
    >
      <DialogContent>
        <Grid
          container
          spacing={2}
          className="selected-recipe-view-grid"
          id="selected-recipe-grid"
        >
          <DialogTitle id="recipe-dialog-title">
            {loading ? "Loading Recipe..." : recipe?.title}
          </DialogTitle>
          <Box>
            {loading ? (
              <CircularProgress />
            ) : error ? (
              <Typography color="error">{`Error Loading Recipe Details: ${error}`}</Typography>
            ) : (
              <Box>
                <Typography variant="h6" gutterBottom>
                  Ingredients:
                </Typography>
                <ul>
                  {recipe.items?.map((item, index) => (
                    <li key={index}>{item.name}</li>
                  ))}
                </ul>
              </Box>
            )}
            <DialogActions id="add-to-list-action-button">
              <Box
                id="agregar-a-list-button-container"
                className="agregar-a-list-button-container"
              >
                <Button
                  onClick={onAddList}
                  id="recipe-dialog-add-to-list-button"
                >
                  <Typography variant="h6" color="white">
                    Agregar a lista
                  </Typography>
                </Button>
              </Box>
            </DialogActions>
          </Box>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

export default RecipeDetails;
