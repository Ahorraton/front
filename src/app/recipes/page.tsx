import { Box } from "@mui/material";
import RecipePage from "./Recipe";
import "./recipe.css";

export default function Page() {
  return (
    <Box component="div" className="recipe-layout" id="recipe-style">
      {/* <HeroSection recipes={recipes} /> */}
      <RecipePage />
    </Box>
  );
}
