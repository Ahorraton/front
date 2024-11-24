import React from "react";
import {
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Box,
} from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
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
        <ListItemText
          primary={getItemNameFormated(item)}
          secondary={`Cantidad: ${item.amount}`}
        />

        <ListItemSecondaryAction>
          <IconButton
            id="add-item-button"
            edge="end"
            aria-label="add"
            onClick={() => onAdd(item.ean)}
          >
            <AddCircleIcon />
          </IconButton>
          <IconButton
            id="remove-item-button"
            edge="end"
            aria-label="remove"
            onClick={() => onRemove(item.ean)}
          >
            <RemoveCircleIcon />
          </IconButton>
          <IconButton
            id="delete-product-button"
            edge="end"
            aria-label="delete"
            onClick={() => onDelete(item.ean)}
          >
            <DeleteIcon />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    </Box>
  );
};

export default ListItemComponent;
