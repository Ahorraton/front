import { Box, IconButton, Link } from "@mui/material";
import React from "react";
import SettingsIcon from "@mui/icons-material/Settings";

export default function MoreOptions() {
  return (
    <Box textAlign="center" m={2}>
      <Link href="/miLista">
        <IconButton color="primary">
          <SettingsIcon />
        </IconButton>
      </Link>
    </Box>
  );
}
