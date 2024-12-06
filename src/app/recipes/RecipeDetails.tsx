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
  List,
  ListItem,
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
  console.log(recipe.ingredients);
  return (
    <Dialog
      open={recipe !== null}
      onClose={onClose}
      aria-labelledby="recipe-dialog-title"
      id="recipe-details-dialog"
      className="selected-recipe-layout"
    >
      <DialogContent id="dialog-content-div" className="selected-recipe-layout">
        <DialogTitle id="recipe-dialog-title">{recipe?.title}</DialogTitle>
        <Box
          component="img"
          src={recipe.img_url}
          onError={(e) => {
            e.currentTarget.src = DEFAULT_PROD_IMG;
          }}
          id="selected-recipe-img"
          className="selected-recipe-img"
        />

        <Box
          className="selected-recipe-view-grid"
          id="selected-recipe-grid"
        >
          <Box>
            <Typography id="ingredients-title" variant="h6" gutterBottom>
              Ingredientes:
            </Typography>
          </Box>

          <Box id="ingredients-and-add-button">
            <Box id="ingredients-div" sx={{ alignItems: "center" }}>
              <List
                id="selected-recipe-list-prices"
                className="selected-recipe-list-prices"
              >
                {recipe.ingredients.map((item, index) => (
                  <ListItem key={index} className="recipe-item-layout">
                    <Box id='ingredient' className='ingredient-layout'>
                      <Box>
                      <Typography gutterBottom>
                        <strong>- </strong>{item.name}:
                      </Typography>
                      </Box>
                      <Box>
                        <Typography gutterBottom>
                          <strong>{item.amount}</strong>
                        </Typography>
                      </Box>
                    </Box>

                  </ListItem>
                ))}
              </List>
            </Box>
          </Box>
        </Box>

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
