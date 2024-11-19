"use client";

import { Box, Typography } from "@mui/material";
import RecipePage from "./Recipe";
import "./recipe.css";
import HeroSection from "./heroSection/HeroSection";
import { useEffect, useState } from "react";
import { LoadingHamsterScreen } from "@/app/loadingScreens/loadingHamster/LoadingHamster";
import { fetch_async } from "@/utils/common/fetch_async";
import { Recipe } from "../types/Recipe";

export default function Page() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const res = await fetch_async("/recipes");
        setLoading(false);
        console.log("Recetas recibidas");
        console.log(res);
        const recipes_result: Recipe[] = res.recipes ? res.recipes : [];
        setRecipes(recipes_result);
      } catch (e: unknown) {
        setError("error");
        throw new Error(String(e));
      }
    };
    fetchRecipes();
  }, []);

  return (
    <Box>
      {loading ? (
        <Box component="div" id="loading-recipes" className="loading-recipes">
          <LoadingHamsterScreen />
        </Box>
      ) : error ? (
        <Box
          component="div"
          id="error-loading-recipes-div"
          className="error-loading-recipes"
        >
          <Typography>Error {error}</Typography>
        </Box>
      ) : (
        <Box component="div" className="recipe-layout" id="recipe-style">
          {/* <HeroSection recipes={recipes} /> */}
          <RecipePage recipes={recipes} />
        </Box>
      )}
    </Box>
  );
}
