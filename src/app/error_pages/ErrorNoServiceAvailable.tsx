import { Typography, Box } from "@mui/material";
import React from "react";
import "./error_pages.css";

export default function ErrorNoServiceAvailable({
  error,
}: {
  error: string | null;
}) {
  return (
    <Box id="error-page-container" className="error-page-container">
      <Typography variant="h6" id="error-title" className="error-title">
        Servicio no disponible. Error: {error}
      </Typography>
      <Box
        component="img"
        src="/images/rats/ahorraton.svg"
        alt="Ahorraton Logo"
        sx={{ display: "block", margin: "0 auto", backgroundColor: "black" }}
      />
    </Box>
  );
}
