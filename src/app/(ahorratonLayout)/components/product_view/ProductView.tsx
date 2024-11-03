import { Box, Dialog, DialogContent, DialogTitle, Grid } from "@mui/material";
import Product from "@/app/comparar/types/Product";
import Price from "@/app/comparar/Price";

interface ProductPageDetailsProps {
  product: Product;
  onClose: () => void;
}

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

  console.log("Dentro de card", products);
  console.log("Aca estoy", product);
  type StoreNames =
    | "dia"
    | "carrefour"
    | "vea"
    | "coto"
    | "jumbo"
    | "disco"
    | "default";

  const storeIconMap: Record<StoreNames, string> = {
    dia: "/images/logos/logo_dia.svg",
    carrefour: "/images/logos/logo_carrefour.svg",
    vea: "/images/logos/logo_vea.png",
    coto: "/images/logos/logo_coto.svg",
    jumbo: "/images/logos/logo_jumbo.png",
    disco: "/images/logos/logo_disco.svg",
    default:
      "https://i5.walmartimages.com/asr/e9ff8590-58ad-44f4-8a74-99aff8a72ea9.1bb69167e16a3d0209eb310e758fcb36.jpeg",
  };

  const price_and_market = product.market_price
    .split(",")
    .map((pair) => pair.trim());
  const prices = price_and_market.map((price_market) =>
    parseFloat(price_market.split(" ")[1])
  );
  const urls = product.urls.split(",");
  const minPrice = Math.min(...prices);
  return (
    <Dialog open={true} onClose={onClose} aria-labelledby="product-page-title">
      <DialogTitle id="recipe-dialog-title" align="center">
        {title}
      </DialogTitle>

      <DialogContent>
        <Grid container spacing={2}>
          <Box display="flex" alignItems="center" justifyContent="center">
            <Grid item xs={12} sm={4}>
              <Box
                component="img"
                // src={image_url ?? storeIconMap.default}
                src={storeIconMap.default}
                sx={{
                  maxWidth: "200px",
                  height: "auto",
                  borderRadius: "30px",
                }}
              />
            </Grid>

            <Grid item xs={12} sm={8}>
              <Box className="market-row">
                {price_and_market.map((price_market: string, index: number) => {
                  const market_price_vec = price_market.split(" ");
                  /* Suponiendo que no existe market con espacio en el nombre */
                  const logo = storeIconMap[market_price_vec[0] as StoreNames];
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
