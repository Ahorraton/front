import { Box } from "@mui/material";
import React, { useRef } from "react";
import { ArrowInterface, HeroSectionProps } from "./recipeInterface";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import "./heroSection.css";
import RecipeSlide from "./recipeSlide";

const HeroSection: React.FC<HeroSectionProps> = ({ recipes }) => {
  const sliderRef = useRef<Slider | null>(null);

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    arrows: false,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <Box component="div" sx={{ position: "relative" }}>
      <Box
        component="section"
        sx={{
          marginBottom: "2%",
          paddingTop: "2%",
          paddingBottom: "2%",
        }}
      >
        <Slider {...settings} ref={sliderRef}>
          {recipes.map((recipe) => (
            <RecipeSlide {...recipe} />
          ))}
        </Slider>
        <CustomArrow
          direction="left"
          onClick={() => sliderRef.current && sliderRef.current.slickPrev()}
        />
        <CustomArrow
          direction="right"
          onClick={() => sliderRef.current && sliderRef.current.slickNext()}
        />
      </Box>
    </Box>
  );
};

const CustomArrow: React.FC<ArrowInterface> = (props) => {
  const { onClick, direction } = props;
  return (
    <Box
      component="div"
      sx={{
        display: {
          xs: "none",
          md: "block",
        },
        position: "absolute",
        top: "35%",
        right: direction === "right" ? "5%" : "auto",
        zIndex: 1,
        color: "black",
        padding: "0.5rem",
        borderRadius: "50%",
      }}
      onClick={() => onClick()}
    >
      {direction === "right" ? <ArrowForwardIcon /> : <ArrowBackIcon />}
    </Box>
  );
};

export default HeroSection;
