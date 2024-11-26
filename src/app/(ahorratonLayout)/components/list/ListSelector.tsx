import React, { useState } from "react";
import { Box, FormControl } from "@mui/material";
import ListSelector from "@/app/miLista/ListSelector";

const SelectListComponent = () => {
  const [isListSaved, setIsListSaved] = useState<boolean>(true);
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [pendingListId, setPendingListId] = useState<number | null>(null);

  return (
    <Box textAlign="center" m={2}>
      <Box id="select-list-container" className="select-list-container">
        <FormControl fullWidth>
          {/* <InputLabel id="selected-list-label">Lista Seleccionada</InputLabel> */}

          <ListSelector/>
        </FormControl>
      </Box>
    </Box>
  );
};

export default SelectListComponent;
