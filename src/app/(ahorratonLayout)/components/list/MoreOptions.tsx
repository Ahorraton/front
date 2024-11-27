import { Box, IconButton, Link } from "@mui/material";
import React from "react";
import SettingsIcon from "@mui/icons-material/Settings";
import FilterAltIcon from "@mui/icons-material/FilterAlt";

export default function MoreOptions({ isLoggedIn }: { isLoggedIn: boolean }) {
  return (
    <Box textAlign="center" m={2}>
      <Link href="/miLista">
        <IconButton color="primary">
          {isLoggedIn ? <SettingsIcon /> : <FilterAltIcon />}
        </IconButton>
      </Link>
    </Box>
  );
}
