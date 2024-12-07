"use client";
import React, { useState } from "react";
import { Box, Button, Breadcrumbs, Link, Typography } from "@mui/material";
import TuneIcon from "@mui/icons-material/Tune";
import MiLista from "./MiLista";

export default function Page() {
  const [filterModal, setFilterModal] = useState<boolean>(false);
  return (
    <Box>
      <Box mt={5}>
        <Box display='flex' flexDirection='row' justifyContent='space-between' alignItems='center'>
          <Breadcrumbs aria-label="breadcrumb">
            <Link color="inherit" href="/">
            <strong>Inicio</strong>
            </Link>
            <Typography color="textPrimary"><strong>Mi lista</strong></Typography>
          </Breadcrumbs>
          <Button 
              variant="contained"
              onClick={() => setFilterModal(true)} 
              sx={{
              '&:hover': {
                backgroundColor: 'darkblue',
              },
            }}
            >
              <TuneIcon />
              Filtros
            </Button>
        </Box>
        <MiLista showFilterModal={filterModal} setFilterModal={setFilterModal}/>
      </Box>
    </Box>
  );
}
