import React, { useState } from "react";
import { Box, Drawer, IconButton, Typography, useMediaQuery } from "@mui/material";
import ListAltIcon from "@mui/icons-material/ListAlt";
import ListContent from "./ListContent";
import "./list-style.css";

const ListIconComponent: React.FC = () => {
  const isMobile = useMediaQuery("(max-width:600px)");
  const scale = isMobile ? 1.2 : 1.5;
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <Box component="div" id="list-icon">
      <IconButton
        color="inherit"
        onClick={() => setDrawerOpen(true)}
        style={{ transform: `scale(${scale})` }}
      >
        <ListAltIcon />
      </IconButton>
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        id="list-layout-style"
        className="list-layout"
      >
        <ListContent />
      </Drawer>
    </Box>
  );
};

export default ListIconComponent;
