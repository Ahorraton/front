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
import "./product_view.css";
import { getStoreIcon } from "../../../../utils/storeIconMap/StoreMap";
import PriceView from "./PriceView";
import {
  process_prod_item,
  get_min_price,
} from "@/app/comparar/utils/process_prod_item";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { useEffect, useState } from "react";

interface ProductPageDetailsProps {
  product_items: ProductItems;
  addProduct: (product: ProductItems) => void;
  onClose: () => void;
}

const DEFAULT_PROD_IMG = "/images/stock_product/rat.png";

export const ProductView: React.FC<ProductPageDetailsProps> = ({
  product_items,
  addProduct,
  onClose,
}) => {
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

  const product_image = product_items.image_url ?? DEFAULT_PROD_IMG;
  const cheapestProduct = products[0];
  const minPrice = get_min_price(products);

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
            <Box
              component="img"
              src={product_image}
              onError={(e) => {
                e.currentTarget.src = DEFAULT_PROD_IMG;
              }}
              id="selected-product-img"
              className="selected-product-img"
            />

            <Box
              id="selected-product-title-prices-container"
              className="selected-product-title-prices-container"
            >
              <DialogTitle
                id="selected-product-title"
                className="selected_product-title"
              >
                {cheapestProduct.name}
              </DialogTitle>

              <List
                id="selected-product-list-prices"
                className="selected-product-list-prices"
              >
                {products.map((product: Product) => {
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
          id="agregar-a-list-button-container"
          className="agregar-a-list-button-container"
        >
          <Button
            id="agregar-a-list-button"
            className="agregar-a-list-button"
            onClick={() => addProduct(product_items)}
          >
            <Typography variant="h6" color="white">
              Agregar a lista
            </Typography>
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};
