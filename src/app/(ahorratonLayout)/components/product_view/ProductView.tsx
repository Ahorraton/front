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
import Product from "@/app/comparar/types/Product";
// import Product from "@/app/types/Product"
import "./product_view.css";
import { getStoreIcon } from "../../../../utils/storeIconMap/StoreMap";
import PriceView from "./PriceView";

interface ProductPageDetailsProps {
  product: Product;
  addProduct: (product: Product) => void;
  onClose: () => void;
}

const DEFAULT_PROD_IMG = "/images/stock_product/rat.png";

export const ProductView: React.FC<ProductPageDetailsProps> = ({
  product,
  addProduct,
  onClose,
}) => {
  const products = product.market_price
    .split(", ")
    .map((price_market) => {
      const [store, price] = price_market.split(" ");
      return {
        market: store,
        price: Number(price),
      };
    })
    .sort((a, b) => a.price - b.price);
  console.log(product.dir_sucursal);
  const cheapestProduct = products[0];
  const title = product.names_list.split(",")[0];

  console.log("Dentro");
  console.log(products);
  console.log("productos", product);

  const price_and_market = product.market_price
    .split(",")
    .map((pair) => pair.trim());
  const prices = price_and_market.map((price_market) =>
    parseFloat(price_market.split(" ")[1])
  );
  const urls = product.urls.split(",");
  const minPrice = Math.min(...prices);

  const prod_img = product.image_url ?? DEFAULT_PROD_IMG;

  return (
    <Dialog
      open={product ? true : false}
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
              src={prod_img}
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
                {title}
              </DialogTitle>

              <List
                id="selected-product-list-prices"
                className="selected-product-list-prices"
              >
                {price_and_market.map((price_market: string, index: number) => {
                  const market_price_vec = price_market.split(" ");
                  const logo = getStoreIcon(market_price_vec[0]);
                  const price = market_price_vec[1];
                  return <PriceView index={index} logo={logo} price={price} />;
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
            // onClick={{
            //   product.ean,
            //   market_price,
            //   names_list,
            //   image_url,
            //   urls,
            //   dir_sucursal,
            // }}
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

// <Grid item xs={12} sm={8}>
//   <Box className="market-row">
//     {price_and_market.map((price_market: string, index: number) => {
//       const market_price_vec = price_market.split(" ");
//       /* Suponiendo que no existe market con espacio en el nombre */
//       const logo = getStoreIcon(market_price_vec[0]);
//       const price = market_price_vec[1];
//       return (
//         <Price
//           key={price_market}
//           logo={logo}
//           price={price}
//           color={"blue"}
//           cheapest={parseFloat(price) === minPrice}
//           url={urls[index]}
//         />
//       );
//     })}
//   </Box>
// </Grid>;
