import { Product } from "./Product";

export type Ingredient = {
  id: number;
  name: string;
  amount: number;
  ean?: string;
};

export type Item = {
  name: string;
  amount: number;
  ean: string;
  product?: Product;
};
