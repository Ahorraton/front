import axios from 'axios';
import React, { useState, useEffect } from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  CircularProgress,
} from '@mui/material'

import { addItems } from '../../redux/store/listSlice';
import { useSelector, useDispatch } from 'react-redux';

interface RecipeDetailsProps {
  recipeId: number
  onClose: () => void
  onAddList: () => void
}

interface RecipeData {
  id: number
  title: string
  image: string
  description: string
  ingredients: string[]
  instructions: string[]
}

const RecipeDetails: React.FC<RecipeDetailsProps> = ({ recipeId, onClose }) => {
  const [recipe, setRecipe] = useState<RecipeData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        // const response = await axios.get('/api/recipe/getRecipe', {
        //     params: { recipe_id: recipeId }
        // });

        const response = {
            "id": 1,
            "title": "Receta de chocotorta",
            "image": "https://s3.amazonaws.com/arc-wordpress-client-uploads/infobae-wp/wp-content/uploads/2018/09/14170007/chocotorta-destacada.jpg",
            "description": "La chocotorta es un postre tradicional argentino, hecho en capas alternadas de galletitas de chocolate (tipo Chocolinas) mojadas en café o leche, y una mezcla de queso crema y dulce de leche. No requiere cocción, lo que la convierte en un postre fácil y rápido de preparar. Su textura es suave y cremosa, y su sabor es una combinación perfecta entre el dulce de leche y el chocolate. Es ideal para ocasiones especiales o como postre diario.",
            "product_ids": [1,2,3],
            "ingredients": ["papas", "pan"],
            "instructions": ["preparalo"]
            }

        // const title = response.data.data.title;
        // const image = response.data.data.image;
        // const description = response.data.data.description;
        // const productList = response.data.data.product_list;

        setRecipe({
            "id": response.id,
            "title": response.title,
            "image": response.image,
            "description": response.description,
            "ingredients": response.ingredients,
            "instructions": response.instructions
        })
        
        setLoading(false)
      } catch (err) {
        setError('Error fetching recipe. Please try again.')
        setLoading(false)
      }
    }

    fetchRecipe()
  }, [recipeId])

  const onAddList = () => {
    dispatch(addItems(
      recipe?.ingredients.map((ingredient, index) => ({ name: ingredient, quantity: index, ean: index.toString()})) || []
    ));
  }

  return (
    <Dialog open={true} onClose={onClose} aria-labelledby="recipe-dialog-title">
      <DialogTitle id="recipe-dialog-title">
        {loading ? 'Loading Recipe...' : recipe?.title}
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
                <li key={index}>{ingredient}</li>
              ))}
            </ul>
            <Typography variant="h6" gutterBottom>
              Instructions:
            </Typography>
            <ol>
              {recipe.instructions.map((instruction, index) => (
                <li key={index}>{instruction}</li>
              ))}
            </ol>
          </>
        ) : null}
      </DialogContent>
      <DialogActions>
      <Button onClick={(onAddList)} color="secondary">
          Add to list
        </Button>
        <Button onClick={onClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default RecipeDetails