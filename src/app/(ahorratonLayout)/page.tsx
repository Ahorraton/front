"use client";
import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import MetaDataContainer from "@/app/global_layout/MetaDataContainer";
import { Product } from "@/app/types/Product";
import { fetch_async } from "@/utils/common/fetch_async";
import FeaturedProducts from "@/app/(ahorratonLayout)/components/product_search/ProductGrid";
import "./landing_page.css";
import { Recipe } from "../types/Recipe";
import SearchBar from "../global_layout/navBar/SearchBar";
import FeaturedRecipes from "./components/featuredRecipes/FeaturedRecipes";
import { LoadingHamsterScreen } from "../loadingScreens/loadingHamster/LoadingHamster";
import ErrorNoServiceAvailable from "@/app/error_pages/ErrorNoServiceAvailable";

export default function Home() {
  const [error, setError] = React.useState<string | null>(null);

  const [loadingFeaturedProducts, setLoadingFeaturedProducts] =
    React.useState<boolean>(true);
  const [featuredProducts, setFeaturedProducts] = React.useState<Product[]>([]);

  const [loadingFeaturedRecipes, setLoadingFeaturedRecipes] =
    React.useState<boolean>(true);
  const [featuredRecipes, setRecipes] = React.useState<Recipe[]>([]);
  const [selectedFeaturedProduct, setSelectedFeaturedProduct] = React.useState<
    string | null
  >(null);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const res = await fetch_async("/recipes");
        const recipes_result: Recipe[] = res.recipes ? res.recipes : [];
        setRecipes(recipes_result);
        setLoadingFeaturedRecipes(false);
      } catch (e: unknown) {
        setError("error fetching featured recipes");
        throw new Error(String(e));
      }
    };
    fetchRecipes();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch_async("featured_products");
        const products_result: Product[] = res.featured_products
          ? res.featured_products
          : [];
        setFeaturedProducts(products_result);
        setLoadingFeaturedProducts(false);
      } catch (e: unknown) {
        setError("error fetching featured products");
        throw new Error(String(e));
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    if (selectedFeaturedProduct) {
      window.location.href = `/comparar?query=${selectedFeaturedProduct}`;
    }
  }, [selectedFeaturedProduct]);

  const [query, setQuery] = useState(typeof window !== "undefined" ? new URLSearchParams(window.location.search).get("query") || "" : "");

  return (
    <MetaDataContainer title="Ahorraton" description="Ahorra en grande">
      {loadingFeaturedProducts || loadingFeaturedRecipes ? (
        <Box component="div" id="outsideBox" className="loading-layout">
          <LoadingHamsterScreen />
        </Box>
      ) : error ? (
        <Box className="error-layout">
          <ErrorNoServiceAvailable error={error} />
        </Box>
      ) : (
        <Box component="div" id="outsideBox" className="home-screen-layout">
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
          >
            <Typography variant="h1" className="spin-on-hover">
              🐭
            </Typography>
            <Typography variant="h1">Ahorratón</Typography>
            <br />
            <SearchBar starting_query={query} set={setQuery} />
          </Box>

          <Box
            component="div"
            id="featured-prod-recipes-div"
            className="featured-prod-recipes-div"
          >
            <Box
              component="div"
              id="featured-product-div"
              className="featured-products-layout"
            >
              <FeaturedProducts
                products={featuredProducts}
                setSelectedFeaturedProduct={setSelectedFeaturedProduct}
              />
            </Box>
            <Box
              component="div"
              id="featured-recipes-div"
              className="featured-recipes-layout"
            >
              <FeaturedRecipes recipes={featuredRecipes} />
            </Box>
          </Box>
        </Box>
      )}
    </MetaDataContainer>
  );
}
