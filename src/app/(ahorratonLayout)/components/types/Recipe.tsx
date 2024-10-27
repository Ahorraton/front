import { Ingredient } from "./Ingredient";

export type Recipe = {
  id: number;
  title: string;
  description: string;
  img_url: string;
  ingredients: Ingredient[];
};
