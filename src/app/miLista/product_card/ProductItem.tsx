import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Grid, Paper, Box, Typography, IconButton } from "@mui/material";

import { addItem, removeItem, deleteItem } from "../../../redux/store/listSlice";
import {
  hexToRgb,
  interpolateColor,
  rgbToHex,
  marketImage,
} from "../../../obsolete/ProductPaperAle";
import WarningModal from "../WarningModal";
import { Product } from "../../types/Product";
import './card.css';
import { getStoreIcon } from "@/utils/storeIconMap/StoreMap";
import CardActions from "./actions/CardActions";
import CardTitle from "./title/CardTitle";

type ProductItemProps = {
  product: Product;
};

const ProductItem: React.FC<ProductItemProps> = ({ product }) => {
  const dispatch = useDispatch();
  const [isWarningOpen, setIsWarningOpen] = useState(false);
  const [warningAction, setWarningAction] = useState<() => void>(() => {});

  const handleAddAmount = (ean: string) => {
    dispatch(addItem({ ean, amount: 1 }));
  };

  const handleRemoveAmount = (ean: string) => {
    if (product.amount && product.amount > 1) {
      dispatch(removeItem(ean));
    } else {
      setWarningAction(() => () => dispatch(removeItem(ean)));
      setIsWarningOpen(true);
    }
  };

  const handleDeleteItem = (ean: string) => {
    setWarningAction(() => () => dispatch(deleteItem(ean)));
    setIsWarningOpen(true);
  };

  const handleCloseWarning = () => {
    setIsWarningOpen(false);
  };

  const handleConfirmWarning = () => {
    warningAction();
    setIsWarningOpen(false);
  };

  const prices = [product.price];
  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);
  const green = hexToRgb("#157a01");
  const black = hexToRgb("#000000");

  const getColorForPrice = (price: number): string => {
    const normalizedPrice = (price - minPrice) / (maxPrice - minPrice);
    const interpolatedColor = interpolateColor(green, black, normalizedPrice);
    return rgbToHex(interpolatedColor);
  };

  const color = getColorForPrice(product.price);
  const logo = marketImage(product.market);
  return (
    <>
      <Grid item xs={12} sm={6} md={4} lg={3} display='flex'>
        <Box className='product-card-layout'>
          <Paper elevation={8}>
            <Box className='product-card'>
              <CardTitle logo={logo} product={product} />
              <Box className='product-card'>
                <Box
                  component="img"
                  className='product-image'
                  id="product-image"
                  src={product.image_url || ""}
                  onError={(e) => {
                    e.currentTarget.src = getStoreIcon("default");
                  }}
                />
                <Box className='market-price'>
                  <Typography
                    variant="body1"
                  >
                    <strong>${product.price}</strong>
                  </Typography>
                </Box>
              </Box>
              <CardActions
                product={{ ean: product.ean, amount: product.amount || 0 }}
                handleRemoveAmount={handleRemoveAmount}
                handleAddAmount={handleAddAmount}
                handleDeleteItem={handleDeleteItem}
              />
            </Box>
          </Paper>
        </Box>
      </Grid>
      <WarningModal
        open={isWarningOpen}
        onClose={handleCloseWarning}
        onConfirm={handleConfirmWarning}
        title="Confirmar eliminación"
        message="¿Deseas eliminar este producto de la lista?"
      />
    </>
  );
};

export default ProductItem;
