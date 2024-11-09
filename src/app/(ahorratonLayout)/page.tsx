"use client";
import React, { useEffect } from "react";
import { Box, Typography } from "@mui/material";
import MetaDataContainer from "@/app/global_layout/MetaDataContainer";
import { Product } from "@/app/types/Product";
import { fetch_async } from "@/utils/common/fetch_async";
import FeaturedProducts from "@/app/(ahorratonLayout)/components/product_search/ProductGrid";
import "./landing_page.css";
import HeroSection from "./components/heroSection";
import { Recipe } from "../types/Recipe";
import { LoadingFeaturedProducts } from "./loadingScreens/LoadingFeaturedProducts";
import { LoadingHeroComponent } from "./loadingScreens/LoadingRecipes";

export default function Home() {
  const [loading, setLoading] = React.useState<boolean>(true);
  const [products, setProducts] = React.useState<Product[]>([]);
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
        setProducts(products_result);
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

  return (
    <MetaDataContainer title="Ahorraton" description="Ahorra en grande">
      {loading ? (
        <Box component="div">
          <LoadingHeroComponent />
          <Box py={4} p={4}>
            <LoadingFeaturedProducts />
          </Box>
        </Box>
      ) : (
        <Box component="div">
          <HeroSection recipes={recipes} />
          <Box className="page-layout">
            {products.length === 0 ? (
              <Typography variant="h6" align="center">
                No se encontraron productos.
              </Typography>
            ) : (
              <Box component="div" id="selected-product-div">
                <FeaturedProducts
                  products={products}
                  setSelectedFeaturedProduct={setSelectedFeaturedProduct}
                />
              </Box>
            )}
          </Box>
        </Box>
      )}
    </MetaDataContainer>
  );
}
