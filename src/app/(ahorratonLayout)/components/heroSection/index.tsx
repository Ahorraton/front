import { Box } from "@mui/material";
import React from "react";
import { HeroSectionProps } from "./recipeInterface";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import "./heroSection.css";
import RecipeSlide from "./recipeSlide";

const HeroSection: React.FC<HeroSectionProps> = ({ recipes }) => {
  var settings = {
    dots: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <Box
      component="section"
      {...settings}
      sx={{
        marginBottom: "2rem",
      }}
    >
      <Slider>
        {recipes.map((recipe) => (
          <RecipeSlide {...recipe} />
        ))}
      </Slider>
    </Box>
  );
};

export default HeroSection;
