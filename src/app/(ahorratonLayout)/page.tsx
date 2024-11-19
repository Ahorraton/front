"use client";
import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import MetaDataContainer from "@/app/global_layout/MetaDataContainer";
import { Product } from "@/app/types/Product";
import { fetch_async } from "@/utils/common/fetch_async";
import FeaturedProducts from "@/app/(ahorratonLayout)/components/product_search/ProductGrid";
import "./landing_page.css";
import HeroSection from "./components/heroSection";
import { Recipe } from "../types/Recipe";
import SearchBar from "../global_layout/navBar/SearchBar";
import { useSearchParams } from "next/navigation";
import FeaturedRecipes from "./components/featuredRecipes/FeaturedRecipes";
import { LoadingHamsterScreen } from "../loadingScreens/loadingHamster/LoadingHamster";

export default function Home() {
  const [loading, setLoading] = React.useState<boolean>(true);
  const [featuredProducts, setFeaturedProducts] = React.useState<Product[]>([]);
  const [error, setError] = React.useState<string | null>(null);
  const [recipes, setRecipes] = React.useState<any[]>([]);
  const [selectedFeaturedProduct, setSelectedFeaturedProduct] = React.useState<
    string | null
  >(null);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const res = await fetch_async("/recipes");
        const recipes_result: Recipe[] = res.recipes ? res.recipes : [];
        setRecipes(recipes_result);
      } catch (e: unknown) {
        setError("error");
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
        setLoading(false);
      } catch (e: unknown) {
        setError("error");
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

  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("query") || "");

  return (
    <MetaDataContainer title="Ahorraton" description="Ahorra en grande">
      {loading ? (
        <Box component="div" id="outsideBox" className="loading-layout">
          <LoadingHamsterScreen />
        </Box>
      ) : error ? (
        <Box className="error-layout">
          <Typography variant="h6" align="center">
            Servicio no disponible. Error: {error}
          </Typography>
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
              <FeaturedRecipes recipes={recipes} />
            </Box>
          </Box>
        </Box>
      )}
    </MetaDataContainer>
  );
}
