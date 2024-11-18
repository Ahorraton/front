import { styled, Typography } from "@mui/material";

const NoProductFoundStyle = styled("div")(() => ({
  display: "flex",
  flexDirection: "column",
  minHeight: "100vh",
  justifyContent: "center",
}));

const NoProductsFound = () => {
  return (
    <NoProductFoundStyle
      className="noproductfoundstyle"
      id="no-product-found-style"
    >
      <Typography variant="h5">No se encontraron productos</Typography>
    </NoProductFoundStyle>
  );
};

export default NoProductsFound;
