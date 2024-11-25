import { CircularProgress, Box, Typography } from "@mui/material";
import React from "react";

export default function Loading() {
  return (
    <Box>
      <CircularProgress />
      <Typography>Loading...</Typography>
    </Box>
  );
}
