import { Box, styled, Typography } from "@mui/material";

const NoProductsFound = () => {
  return (
    <Box
      id="error-page-container"
      className="error-page-container"
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "70vh", 
        textAlign: "center", 
        marginBottom: "4.5rem", 
      }}
    >
      <Box
        component="img"
        src="/images/rats/sad_rat.svg"
        alt="No products found"
        sx={{ height: "20rem", marginRight: "4rem" }}
      />
      <Typography variant="h6" id="error-title" className="error-title">
        {"¡Ups! No hemos encontrado ningún producto :(" }
      </Typography>
    </Box>
  );
};

export default NoProductsFound;
