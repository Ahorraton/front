'use client'

import React, { useState, useEffect } from 'react';
import { Typography, Grid, Card, CardContent, CardMedia, CircularProgress } from '@mui/material';
import RecipeDetails from './RecipeDetails';
import { fetchRecipe } from '../../utils/apiUtils';
import { useDispatch } from 'react-redux';
import {RecipeInterface} from './recipeInterface';


const initialRecipes: RecipeInterface[] = [
  { id: 1, title: 'Empanadas de carne', image: 'https://assets.unileversolutions.com/recipes-v2/239857.jpg' },
  { id: 2, title: 'Chicken Curry', image: 'https://themalbecpost.com/wp-content/uploads/2021/01/TORTILLA-DE-PATATAS.jpg' },
  { id: 3, title: 'Pizza Casera', image: 'https://cocinaeficaz.com/wp-content/uploads/2017/06/receta-facil-para-hacer-una-pizza-mozzarella-casera-min.jpg' },
  { id: 4, title: 'Provoleta', image: 'https://cdn7.kiwilimon.com/recetaimagen/21771/11560.jpg' },
  { id: 5, title: 'Choripan', image: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.gastrolabweb.com%2Fu%2Ffotografias%2Fm%2F2021%2F6%2F3%2Ff1280x720-14239_145914_5050.jpg&f=1&nofb=1&ipt=000efbfa05f2870aab4419b0b8206194044b4b46bebeab0612e30e71219633cc&ipo=images' },
  { id: 6, title: 'Flan casero', image: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fd1uz88p17r663j.cloudfront.net%2Foriginal%2Fb521e9b0f64d6f4f192535cd6f091601_Flan_casero_2.jpg&f=1&nofb=1&ipt=022746b97dce187a533dbaf1a8e540ae677b1e44dbd6095052d74273171e6850&ipo=images' },
  ]

export default function Recipe() {

  const [recipes, setRecipes] = useState<RecipeInterface[]>([])
  const [selectedRecipe, setSelectedRecipe] = useState<number | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const dispatch = useDispatch();


  const handleRecipeClick = (recipeId: number) => {
    setSelectedRecipe(recipeId)
  }

  // if (loading) {
  //   return <CircularProgress />
  // }

  return (
    <>
      <Typography variant="body1" paragraph>
        Cocina nuestras deliciosas recetas al mejor precio posible!
      </Typography>
      <Typography variant="h5" component="h2" gutterBottom>
        Featured Recipes
      </Typography>
      <Grid container spacing={4}>
        {initialRecipes.map((recipe) => (
          <Grid item key={recipe.id} xs={12} sm={6} md={4}>
            <Card
              onClick={() => handleRecipeClick(recipe.id)}
              sx={{ cursor: 'pointer', textDecoration: 'none' }}
            >
              <CardMedia
                component="img"
                height="200"
                image={recipe.image}
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
      {selectedRecipe && (
        <RecipeDetails
          recipeId={selectedRecipe}
          onClose={() => setSelectedRecipe(null)}
          onAddList={() => console.log("Adding to list")}
        />
      )}
    </>
  )
}