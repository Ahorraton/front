export type Recipe = {
  title: string;
  description: string;
  img_url: string;
  ingredients: Ingredient[];
};

export type Ingredient = {
  name: string;
  amount: string;
};

export interface HeroSectionProps {
  recipes: Recipe[];
}
