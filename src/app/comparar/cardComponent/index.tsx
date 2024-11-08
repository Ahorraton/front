import IconMarket from "@/utils/IconMarket";
import {
  Box,
  Button,
  CardActionArea,
  CardActions,
  CardContent,
  CardHeader,
  Icon,
  Link,
  Paper,
  Typography,
} from "@mui/material";
import { Card } from "@mui/material";
import React, { useState } from "react";

interface Product {
  ean: string;
  market_price: string;
  names_list: string;
  image_url: string;
  urls: string;
  dir_sucursal: string;
}

interface cardComponentProps {
  product: Product;
  addProduct: (product: Product) => void;
  setProductPage: (product: Product) => void;
  setShowAlert: (showAlert: Boolean) => void;
}

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

const ProductCardSearch: React.FC<cardComponentProps> = ({
  product: { ean, market_price, names_list, image_url, urls, dir_sucursal },
  addProduct,
  setProductPage,
  setShowAlert,
}) => {
  const products = market_price
    .split(", ")
    .map((price_market) => {
      const [store, price] = price_market.split(" ");
      return {
        market: store,
        price: Number(price),
      };
    })
    .sort((a, b) => a.price - b.price);
  console.log(dir_sucursal);
  const cheapestProduct = products[0];
  const title = names_list.split(",")[0];
  return (
    <Card
      key={ean}
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
        onClick={() =>
          setProductPage({
            ean,
            market_price,
            names_list,
            image_url,
            urls,
            dir_sucursal,
          })
        }
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
              src={image_url ?? storeIconMap.default}
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
                <Typography variant="body1">{dir_sucursal}</Typography>
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
            addProduct({
              ean,
              market_price,
              names_list,
              image_url,
              urls,
              dir_sucursal,
            });
            setShowAlert(true);
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
