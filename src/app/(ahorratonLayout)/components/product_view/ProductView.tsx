import { Box, Dialog, DialogContent, DialogTitle, Grid } from "@mui/material";
import Product from "@/app/comparar/types/Product";
import Price from "@/app/comparar/Price";
import "./product_view.css";
import { getStoreIcon } from "../../../../utils/storeIconMap/StoreMap";

interface ProductPageDetailsProps {
  product: Product;
  onClose: () => void;
}

const DEFAULT_PROD_IMG = "/images/stock_product/rat.png";

export const ProductView: React.FC<ProductPageDetailsProps> = ({
  product,
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
      open={true}
      onClose={onClose}
      aria-labelledby="product-page-title"
      className="selected-product-view"
      id="selected-product-view"
    >
      <DialogTitle id="selected-product-title" align="center">
        {title}
      </DialogTitle>

      <DialogContent>
        <Grid
          container
          spacing={2}
          className="selected-product-view-grid"
          id="selected-product-grid"
        >
          <Box display="flex" alignItems="center" justifyContent="center">
            <Grid item xs={12} sm={4}>
              <Box
                component="img"
                src={prod_img}
                onError={(e) => {
                  e.currentTarget.src = DEFAULT_PROD_IMG;
                }}
                id="selected-product-img"
                className="selected-product-img"
              />
            </Grid>

            <Grid item xs={12} sm={8}>
              <Box className="market-row">
                {price_and_market.map((price_market: string, index: number) => {
                  const market_price_vec = price_market.split(" ");
                  /* Suponiendo que no existe market con espacio en el nombre */
                  const logo = getStoreIcon(market_price_vec[0]);
                  const price = market_price_vec[1];
                  return (
                    <Price
                      key={price_market}
                      logo={logo}
                      price={price}
                      color={"blue"}
                      cheapest={parseFloat(price) === minPrice}
                      url={urls[index]}
                    />
                  );
                })}
              </Box>
            </Grid>
          </Box>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};
