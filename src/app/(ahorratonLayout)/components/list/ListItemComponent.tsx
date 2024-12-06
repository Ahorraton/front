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
                <Box 
                  display="flex" 
                  alignItems="center"
                  justifyContent="left"
                >
                  <IconButton
                    id="remove-item-button"
                    aria-label="remove"
                    onClick={() => onRemove(item.ean)}
                  >
                    <RemoveIcon fontSize="small" />
                  </IconButton>

                  <Typography variant="body2">
                    {item.amount} x ${item.product?.price.toFixed(2)} [{item.product?.market}]
                  </Typography>

                  <IconButton
                    id="add-item-button"
                    aria-label="add"
                    onClick={() => onAdd(item.ean)}
                  >
                    <AddIcon fontSize="small" />
                  </IconButton>
                </Box>
              }
            />

            <ListItemSecondaryAction>
              <Box
                id='delete_and_price_action'
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="right"
                marginBottom={2}
              >
                <Box>
                  <IconButton
                    id="delete-product-button"
                    edge="end"
                    aria-label="delete"
                    onClick={() => onDelete(item.ean)}
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </Box>
                <Box>
                  <Typography color="black" fontWeight="bold" fontSize={"100%"}>
                    $ {item.amount * Number(item.product?.price.toFixed(2))}
                  </Typography>
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
