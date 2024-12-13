import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  List,
  Typography,
} from "@mui/material";
import ProductItems from "@/app/types/ProductItems";
import { Product } from "@/app/types/Product";
import { getStoreIcon } from "../../../../utils/storeIconMap/StoreMap";
import PriceView from "./PriceView";
import {
  process_prod_item,
  get_min_price,
} from "@/app/comparar/utils/process_prod_item";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { useEffect, useState } from "react";
import { ListItemType } from "@/app/types/ListItem";
import { get_cheapest_product, get_image_url, get_longest_title } from "@/app/comparar/utils/getters";
import "./product_view.css";

interface ProductPageDetailsProps {
  product_items: ProductItems;
  savedProducts: ListItemType[];
  addProduct: (product: ProductItems) => void;
  removeProduct: (product: ProductItems) => void;
  onClose: () => void;
}

const DEFAULT_PROD_IMG = "/images/stock_product/rat.png";

export const ProductView: React.FC<ProductPageDetailsProps> = ({
  product_items,
  savedProducts,
  removeProduct,
  addProduct,
  onClose,
}) => {
  const isMobile = window.innerWidth < 768;
  const products: Product[] = process_prod_item(product_items);
  const [isScrollable, setIsScrollable] = useState(false);
  
  if (!products) {
    return <></>;
  }
  
  useEffect(() => {
    if (products.length > 3) {
      setIsScrollable(true);
    } else {
      setIsScrollable(false);
    }
  });
  
  const name = get_longest_title(product_items);
  const product_image = get_image_url(product_items) ?? DEFAULT_PROD_IMG;
  const cheapestProduct = get_cheapest_product(products);
  const minPrice = get_min_price(products);
  
  let added = false;
  const saved_eans = savedProducts.map((product) => product.ean);

  if (saved_eans.includes(cheapestProduct.ean)) {
    added = true;
  }

  return (
    <Dialog
      open={product_items ? true : false}
      onClose={onClose}
      aria-labelledby="product-page-title"
      className="selected-product-view"
      id="selected-product-view"
    >
      <DialogContent>
        <Grid
          container
          spacing={2}
          className="selected-product-view-grid"
          id="selected-product-grid"
        >
          <Box
            id="selected-producto-img-container"
            className="selected-product-container"
          >
            {!isMobile && (
              <Box
                component="img"
                src={product_image}
                onError={(e) => {
                  e.currentTarget.src = DEFAULT_PROD_IMG;
                }}
                id="selected-product-img"
                className="selected-product-img"
              />
            )}

            <Box
              id="selected-product-title-prices-container"
              className="selected-product-title-prices-container"
            >
              <DialogTitle
                id="selected-product-title"
                className="selected_product-title"
              >
                {name}
              </DialogTitle>

              <List
                id="selected-product-list-prices"
                className="selected-product-list-prices"
              >
                {products.map((product: Product) => {
                  console.log(`EAN: ${product.ean}`);
                  return (
                    <PriceView
                      key={product.ean + product.name + product.market}
                      logo={getStoreIcon(product.market)}
                      product={product}
                      is_cheapest={product.price === minPrice}
                    />
                  );
                })}
              </List>
              {isScrollable && (
                <Box
                  id="more-items-icon"
                  component="div"
                  className="more-items-icon"
                >
                  <ArrowDownwardIcon />
                </Box>
              )}
            </Box>
          </Box>
        </Grid>
        <Box
          id="button-container"
          className="button-container"
        >
          { added ? (
            <Box
              id="remove-to-list-action-area"
              onClick={() => {
                removeProduct(product_items);
                added = false;
              }}
              className='remove-to-list-button-container'
            >
              <Button
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
              </Button>
            </Box>
          ):(
            <Box
              id="add-to-list-action-area"
              onClick={() => {
                addProduct(product_items);
                added = true;
              }}
              className='add-to-list-button-container'
            >
              <Button
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
              </Button>
            </Box>
            ) 
          }
        </Box>
      </DialogContent>
    </Dialog>
  );
};
