import { Box, styled, Typography } from "@mui/material";

const ErrorPageStyle = styled("div")(() => ({
  display: "flex",
  flexDirection: "column",
  minHeight: "100vh",
  justifyContent: "center",
}));

const ErrorPage = () => {
  return (
    <ErrorPageStyle className="errorpagestyle" id="error-page-style">
      <Box className="error-layout">
        <Typography variant="h5" color="error">
          Error al cargar los productos
        </Typography>
        <Typography variant="body1" color="error">
          Por favor intente mas tarde.
        </Typography>
      </Box>
    </ErrorPageStyle>
  );
};

export default ErrorPage;
