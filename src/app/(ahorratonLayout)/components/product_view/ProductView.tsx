import { Box, Dialog, DialogContent, DialogTitle } from "@mui/material";
import Product from "@/app/comparar/types/Product";

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
  return (
    <Dialog open={true} onClose={onClose} aria-labelledby="product-page-title">
      <DialogTitle id="recipe-dialog-title">{title}</DialogTitle>
      <DialogContent></DialogContent>
    </Dialog>
  );
};
