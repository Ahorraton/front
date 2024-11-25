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
import "./recipe.css";

interface RecipeDetailsProps {
  recipe: Recipe;

  onClose: () => void;
  onAddList: () => void;
}

const DEFAULT_PROD_IMG = "/images/stock_product/rat.png";

const RecipeDetails: React.FC<RecipeDetailsProps> = ({
  recipe,
  onClose,
  onAddList,
}) => {
  return (
    <Dialog
      open={recipe !== null}
      onClose={onClose}
      aria-labelledby="recipe-dialog-title"
      id="recipe-details-dialog"
      className="selected-recipe-layout"
    >
      <DialogContent id="dialog-content-div" className="selected-recipe-layout">
        <Box
          component="img"
          src={recipe.img_url}
          onError={(e) => {
            e.currentTarget.src = DEFAULT_PROD_IMG;
          }}
          id="selected-recipe-img"
          className="selected-recipe-img"
        />
        <Grid
          container
          spacing={2}
          className="selected-recipe-view-grid"
          id="selected-recipe-grid"
        >
          <DialogTitle id="recipe-dialog-title">{recipe?.title}</DialogTitle>
          <Box id="ingredients-and-add-button">
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
          </Box>
        </Grid>

        <DialogActions id="add-to-list-action-button">
          <Box
            id="agregar-a-list-button-container"
            className="agregar-a-list-button-container"
          >
            <Button onClick={onAddList} id="recipe-dialog-add-to-list-button">
              <Typography variant="h6" color="white">
                Agregar a lista
              </Typography>
            </Button>
          </Box>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
};

export default RecipeDetails;
