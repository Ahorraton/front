import ProductItems from "@/app/types/ProductItems";
import IconMarket from "@/utils/storeIconMap/IconMarket";
import {
  Box,
  CardActionArea,
  CardContent,
  CardHeader,
  Typography,
} from "@mui/material";
import { Card } from "@mui/material";
import React from "react";
import { getStoreIcon } from "@/utils/storeIconMap/StoreMap";
import { Product } from "@/app/types/Product";
import "./product_card.css";
import { ListItemType } from "@/app/types/ListItem";
import { 
  get_cheapest_product, 
  get_image_url, get_longest_title 
} from "../utils/getters";

interface cardComponentProps {
  product_items: ProductItems;
  products: Product[];
  savedProducts: ListItemType[];
  addProduct: (product: ProductItems) => void;
  removeProduct: (product: ProductItems) => void;
  setProductPage: (product: ProductItems) => void;
}

const ProductCardSearch: React.FC<cardComponentProps> = ({
  product_items,
  products,
  savedProducts,
  addProduct,
  removeProduct,
  setProductPage,
}) => {
  const longestTitle = get_longest_title(product_items);
  const product_image = get_image_url(product_items);
  const cheapestProduct = get_cheapest_product(products);
  
  let added = false;
  const saved_eans = savedProducts.map((product) => product.ean);
  
  if (saved_eans.includes(cheapestProduct.ean) ){
    added = true;
  }

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
            title={longestTitle}
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
              <Box marginTop={1} color={"#f2ad0c"} textAlign={"center"}>
                { products.length > 1 && (
                  <Typography variant="body2">
                  {`¡Encontramos ${products.length- 1} precio/s más!`}
                  </Typography>
                )}
              </Box>
            </Box>
          </Box>
        </CardContent>
      </CardActionArea>
      {added? (
        <CardActionArea
          id="remove-to-list-action-area"
          onClick={() => {
            removeProduct(product_items);
          }}
        >
          <CardContent
            id="remove-to-list-button-container"
            className="remove-to-list-button-container"
          >
            <Typography
              variant="h6"
              id="button-text"
            className="button-text"
            >
              Quitar de la lista
            </Typography>
          </CardContent>
        </CardActionArea>
      ):(
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
            id="button-text"
            className="button-text"
          >
            Agregar a la lista
          </Typography>
        </CardContent>
      </CardActionArea>
      ) 
    }
    </Card>
  );
};

export default ProductCardSearch;
