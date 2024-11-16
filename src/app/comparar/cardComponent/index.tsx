import ProductItems from "@/app/types/ProductItems";
import IconMarket from "@/utils/storeIconMap/IconMarket";
import {
  Box,
  Button,
  CardActionArea,
  CardActions,
  CardContent,
  CardHeader,
  Typography,
} from "@mui/material";
import { Card } from "@mui/material";
import React from "react";
import { process_prod_item } from "../utils/process_prod_item";
import { getStoreIcon } from "@/utils/storeIconMap/StoreMap";
import { Product } from "@/app/types/Product";
import "./product_card.css";

interface cardComponentProps {
  product_items: ProductItems;
  products: Product[];
  addProduct: (product: ProductItems) => void;
  setProductPage: (product: ProductItems) => void;
}

const ProductCardSearch: React.FC<cardComponentProps> = ({
  product_items,
  products,
  addProduct,
  setProductPage,
}) => {
  const cheapestProduct = products[0];
  const product_image = product_items.image_url;

  return (
    <Card
      key={cheapestProduct.ean}
      id="product-card-container"
      className="product-card"
    >
      <CardActionArea
        id="product-card-action-area"
        className="product-card-action-area"
        onClick={() => setProductPage(product_items)}
      >
        <CardContent>
          <CardHeader
            title={cheapestProduct.name}
            className="product-card-header"
          />
          <Box
            component="div"
            id="product-card-body"
            className="product-card-body"
          >
            <Box
              component="img"
              id="product-card-image"
              className="product-card-image"
              src={product_image}
              onError={(e) => {
                e.currentTarget.src = getStoreIcon("default");
              }}
            />
            <Box component="div">
              <Box
                component="div"
                id="product-card-price"
                className="product-card-price"
              >
                <Typography variant="body1">
                  <strong>Mejor precio:</strong> ${cheapestProduct.price}{" "}
                  <IconMarket icon={cheapestProduct.market} />
                </Typography>
              </Box>
            </Box>
          </Box>
        </CardContent>
      </CardActionArea>
      <CardActionArea
        id="add-to-list-action-area"
        onClick={() => {
          addProduct(product_items);
        }}
      >
        <CardContent
          id="add-to-list-button-container"
          className="add-to-list-button-container"
        >
          <Typography
            variant="h6"
            id="add-to-list-button-text"
            className="add-to-list-button-text"
          >
            {"Agregar a la lista"}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default ProductCardSearch;
