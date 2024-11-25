import { Box, IconButton } from "@mui/material";
import React from "react";
import AddIcon from "@mui/icons-material/Add";

export default function CreateList() {
  return (
    <Box textAlign="center" m={2}>
      <IconButton
        color="primary"
        onClick={() => (window.location.href = `/miLista`)}
      >
        <AddIcon />
      </IconButton>
    </Box>
  );
}
