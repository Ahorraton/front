import { Ingredient, Item } from "./Ingredient";
import { List } from "./List";

export type Recipe = {
  id: number;
  title: string;
  description: string;
  img_url: string;
  grocery_list_id: number;
  // grocery_list: List;
  ingredients: Ingredient[];
  items: Item[];
};

export type RecipeFromDB = {
  recipe: Recipe;
};
