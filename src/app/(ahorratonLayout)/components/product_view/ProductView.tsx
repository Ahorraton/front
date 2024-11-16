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

  const product_image = product_items.image_url ?? DEFAULT_PROD_IMG;
  const product_title = products[0].name;
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
                {product_title}
              </DialogTitle>

              <List
                id="selected-product-list-prices"
                className="selected-product-list-prices"
              >
                {products.map((product) => {
                  return (
                    <PriceView
                      key={product.name + product.market}
                      logo={getStoreIcon(product.market)}
                      product={product}
                      is_cheapest={product.price === minPrice}
                      url={product.url}
                    />
                  );
                })}
              </List>
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
