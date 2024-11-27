import React from "react";
import {
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Box,
  Typography,
  Grid,
} from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
// import RemoveIcon from "@mui/icons-material/RemoveCircle";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteIcon from "@mui/icons-material/Delete";
import { ListItemType } from "@/app/types/ListItem";
import "./list-style.css";

interface ListItemComponentProps {
  item: ListItemType;
  onAdd: (ean: string) => void;
  onRemove: (ean: string) => void;
  onDelete: (ean: string) => void;
}

const MAX_PRODUCT_NAME_LENGTH: number = 20;

const ListItemComponent: React.FC<ListItemComponentProps> = ({
  item,
  onAdd,
  onRemove,
  onDelete,
}) => {
  const getItemNameFormated = (item: ListItemType): string => {
    if (!item || !item.name) {
      return "";
    } else if (item.name.length < MAX_PRODUCT_NAME_LENGTH) {
      return item.name;
    } else {
      return item.name.substring(0, MAX_PRODUCT_NAME_LENGTH) + "...";
    }
  };

  return (
    <Box id="list-item-card" className="list-item-card">
      <ListItem key={item.ean}>
        <Box>
          <Box>
            <ListItemText
              primary={getItemNameFormated(item)}
              secondary={
                <Box display="flex" alignItems="center">
                  <Typography variant="body2">
                    {item.amount} x {item.product?.price.toFixed(2)} $
                  </Typography>
                  {/* <IconButton
                    id="add-item-button"
                    aria-label="add"
                    onClick={() => onAdd(item.ean)}
                  >
                    <AddIcon />
                  </IconButton>
                  <Typography variant="body1" style={{ margin: "0 10px" }}>
                    {item.amount}
                  </Typography>
                  <IconButton
                    id="remove-item-button"
                    aria-label="remove"
                    onClick={() => onRemove(item.ean)}
                  >
                    <RemoveIcon />
                  </IconButton>
                  <IconButton
                    id="delete-product-button"
                    edge="end"
                    aria-label="delete"
                    onClick={() => onDelete(item.ean)}
                  >
                    <DeleteIcon />
                  </IconButton> */}
                </Box>
              }
            />

            <ListItemSecondaryAction>
              <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                mt={2}
              >
                <Typography color="black" fontWeight="bold">
                  {item.amount * Number(item.product?.price.toFixed(2))} $
                </Typography>

                <Box display="flex" alignItems="center">
                  <IconButton
                    id="add-item-button"
                    aria-label="add"
                    onClick={() => onAdd(item.ean)}
                  >
                    <AddIcon fontSize="small" />
                  </IconButton>

                  <IconButton
                    id="remove-item-button"
                    aria-label="remove"
                    onClick={() => onRemove(item.ean)}
                  >
                    <RemoveIcon fontSize="small" />
                  </IconButton>
                  <IconButton
                    id="delete-product-button"
                    edge="end"
                    aria-label="delete"
                    onClick={() => onDelete(item.ean)}
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </Box>
              </Box>
            </ListItemSecondaryAction>
          </Box>
        </Box>
      </ListItem>
    </Box>
  );
};

export default ListItemComponent;
