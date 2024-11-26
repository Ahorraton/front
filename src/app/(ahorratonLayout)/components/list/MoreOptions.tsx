import { Box, IconButton } from "@mui/material";
import React from "react";
import SettingsIcon from "@mui/icons-material/Settings";

export default function MoreOptions() {
  return (
    <Box textAlign="center" m={2}>
      <IconButton
        color="primary"
        onClick={() => (window.location.href = `/miLista`)}
      >
        <SettingsIcon />
      </IconButton>
    </Box>
  );
}
