import { Box, IconButton } from "@mui/material";
import React from "react";
import AddIcon from "@mui/icons-material/Add";

interface NewListProps {
  setCreateNewList: (value: boolean) => void;
}

const CreateListButton: React.FC<NewListProps> = ({ setCreateNewList }) => {
  return (
    <Box textAlign="center">
      <IconButton color="primary" onClick={() => setCreateNewList(true)}>
        <AddIcon />
      </IconButton>
    </Box>
  );
};

export default CreateListButton;
