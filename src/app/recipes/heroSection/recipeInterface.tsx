import { Recipe } from "@/app/types/Recipe";

export interface HeroSectionProps {
  recipes: Recipe[];
}

export interface ArrowInterface {
  direction: string;
  onClick: () => void;
}
