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

interface cardComponentProps {
  product_items: ProductItems;
  addProduct: (product: ProductItems) => void;
  setProductPage: (product: ProductItems) => void;
}

const ProductCardSearch: React.FC<cardComponentProps> = ({
  product_items,
  addProduct,
  setProductPage,
}) => {
  const products = process_prod_item(product_items);

  const cheapestProduct = products[0];
  const title = products[0].name;
  return (
    <Card
      key={cheapestProduct.ean}
      sx={{
        height: "100%",
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        borderRadius: "30px",
        justifyContent: "space-between",
      }}
    >
      <CardActionArea
        onClick={() => setProductPage(product_items)}
        sx={{
          flexGrow: 1,
          borderBottomLeftRadius: "0px",
          borderBottomRightRadius: "0px",
        }}
      >
        <CardContent>
          <CardHeader
            title={title ?? ""}
            sx={{ textAlign: "center" }}
          ></CardHeader>
          <Box
            component="div"
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Box
              component="img"
              src={product_items.image_url}
              onError={(e) => {
                e.currentTarget.src = getStoreIcon("default");
              }}
              sx={{
                maxWidth: "200px",
                height: "auto",
                borderRadius: "30px",
              }}
            />
            <Box component="div">
              <Box
                component="div"
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Typography variant="body1">
                  {product_items.dir_sucursal}
                </Typography>
                <Typography variant="body1">
                  <strong>Mejor precio:</strong> {cheapestProduct.price}
                  <IconMarket icon={cheapestProduct.market} />
                </Typography>
              </Box>
            </Box>
          </Box>
        </CardContent>
      </CardActionArea>
      <CardActions
        sx={{
          width: "100%",
          padding: 0,
        }}
      >
        <Button
          size="large"
          sx={{
            width: "100%",
            height: "100%",
            backgroundColor: "lightblue",
            "&:hover": {
              backgroundColor: "#522719",
            },
          }}
          onClick={() => {
            addProduct(product_items);
          }}
        >
          <Typography variant="h6" color="white">
            {"Agregar a la lista"}
          </Typography>
        </Button>
      </CardActions>
    </Card>
  );
};

export default ProductCardSearch;
