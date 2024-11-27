import React, { useEffect, useState } from "react";
import {
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Box,
  Link,
} from "@mui/material";
import RecipeDetails from "./RecipeDetails";
import { Recipe, RecipeFromDB } from "@/app/types/Recipe";
import { addItems } from "../../redux/store/listSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  fetch_async,
  post_async_with_body,
} from "../../utils/common/fetch_async";
import "./recipe.css";
import { Item } from "../types/Ingredient";
import SelectedItemAlert from "../comparar/selectedItemAlert";
import MetaDataContainer from "../global_layout/MetaDataContainer";
import { ListItemType } from "../types/ListItem";
import { Product } from "../types/Product";
import { RootState } from "@/redux/store";
import Breadcrumbs from "@mui/material/Breadcrumbs";

export default function RecipePage({ recipes }: { recipes: Recipe[] }) {
  const [selectedRecipeId, setSelectedRecipeId] = useState<number | null>(null);
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loadingSelectedRecipe, setSelectedLoading] = useState(true);
  const [errorLoadingRecipe, setErrorLoadingRecipe] = useState<string | null>(
    null
  );

  const user = useSelector((state: RootState) => state.user);

  const [showAlert, setShowAlert] = useState<Boolean>(false);
  const [alertMessage, setAlertMessage] = useState<string>("");
  const [successStatus, setSuccessStatus] = useState<boolean>(false);

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchRecipe = async () => {
      if (selectedRecipeId) {
        try {
          const res: RecipeFromDB = await fetch_async(
            `/recipes/${selectedRecipeId}`
          );

          if (res.recipe) {
            setSelectedLoading(false);
            setShowAlert(false);
            setAlertMessage("");
            setRecipe(res.recipe);
          }
        } catch (e: unknown) {
          setErrorLoadingRecipe(`Error loading recipe: ${e}`);
        }
      } else {
        setSelectedLoading(true);
        setRecipe(null);
      }
    };
    fetchRecipe();
  }, [selectedRecipeId]);

  const fetchRecipeProducts = async (products_eans: string[]) => {
    try {
      const datos = { product_codes: products_eans };
      const res = await post_async_with_body(
        `/grocery_lists/add_prods_to_my_list`,
        datos
      );

      return res.products;
    } catch (e: unknown) {
      throw new Error(String(e));
    }
  };

  const onAddList = async () => {
    // if (!user.isLoggedIn) {
    //   console.error("Not logged in");
    //   setShowAlert(true);
    //   setAlertMessage("No estas loggeado");
    //   setSuccessStatus(false);
    //   return;
    // }
    if (!recipe) {
      console.error("No recipe selected");
      return;
    }

    var products: Product[] = await fetchRecipeProducts(
      recipe.items.map((i: Item) => i.ean)
    );

    // products = products.map((p: Product) => {
    //   p.amount = recipe.items.find((i: Item) => i.ean === p.ean)?.amount;
    //   return p;
    // });

    const items: ListItemType[] = recipe.items.map((i: Item) => ({
      name: i.name,
      amount: i.amount,
      ean: i.ean,
      product: products.find((p: Product) => p.ean === i.ean),
    }));

    dispatch(addItems(items));
    setShowAlert(true);
    setAlertMessage("Agregado a lista");
    setSuccessStatus(true);
  };

  return (
    <MetaDataContainer title="Recipes" description="Recetas Disponibles">
      <Box mt={5}>
        <Breadcrumbs aria-label="breadcrumb">
          <Link color="inherit" href="/">
            Inicio
          </Link>
          <Typography color="textPrimary">Recetas</Typography>
        </Breadcrumbs>

        <Box className="recipe-layout" mt={5}>
          <Grid
            container
            spacing={4}
            id="recipes-grid"
            className="recipes-grid"
          >
            {recipes.map((recipe) => (
              <Grid item key={recipe.id} xs={12} sm={6} md={4}>
                <Card
                  id={`recipe-card-${recipe.id}`}
                  onClick={() => setSelectedRecipeId(recipe.id)}
                  className="recipe-card"
                >
                  <CardMedia
                    component="img"
                    height="200"
                    image={recipe.img_url}
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

          {showAlert && (
            <Box className="alert-box" id="alert-box">
              <SelectedItemAlert
                setShowAlert={setShowAlert}
                alertMessage={alertMessage}
                success={successStatus}
              />
            </Box>
          )}

          {recipe && (
            <RecipeDetails
              recipe={recipe}
              onClose={() => {
                setSelectedRecipeId(null);
                setRecipe(null);
              }}
              onAddList={onAddList}
            />
          )}
        </Box>
      </Box>
    </MetaDataContainer>
  );
}
