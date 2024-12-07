"use client";

import { Box, Breadcrumbs, Link, Typography } from "@mui/material";
import MiLista from "./MiLista";

export default function Page() {
  return (
    <Box>
      <Box mt={5}>
        <Breadcrumbs aria-label="breadcrumb">
          <Link color="inherit" href="/">
          <strong>Inicio</strong>
          </Link>
          <Typography color="textPrimary"><strong>Mi lista</strong></Typography>
        </Breadcrumbs>
        <MiLista />
      </Box>
    </Box>
  );
}
