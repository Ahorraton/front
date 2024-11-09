import React, { useState, useEffect } from "react";
import IconMarket from "@/utils/storeIconMap/IconMarket";
import IconButton from "@mui/material/IconButton";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import { Card, CardMedia } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../redux/store";
import { addItem, removeItem } from "../../../../redux/store/listSlice";
import { Product } from "@/app/types/Product";
import "./product_card.css";
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

const ProductCard = ({
  product,
  onClickSearch,
}: {
  product: Product;
  onClickSearch: (prod_name: string) => void;
}) => {
  const list = useSelector((state: RootState) => state.list.items);
  const [prodCount, setProdCount] = useState<number>(0);
  const dispatch = useDispatch();

  useEffect(() => {
    const item = list.find((item) => item.id === product.id.toString());
    if (item) {
      setProdCount(item.quantity);
    } else {
      setProdCount(0);
    }
  }, [list, product.id]);

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

  const marketImage = () => {
    if (product.image_url) {
      return product.image_url;
    }

    switch (product.market) {
      case "disco":
        return "/images/logos/logo_disco.svg";
      case "carrefour":
        return "/images/logos/logo_carrefour.svg";
      case "jumbo":
        return "/images/logos/logo_jumbo.png";
      case "dia":
        return "/images/logos/logo_dia.svg";
      case "vea":
        return "/images/logos/logo_vea.png";
      case "coto":
        return "/images/logos/logo_coto.svg";
      default:
        return "https://i5.walmartimages.com/asr/e9ff8590-58ad-44f4-8a74-99aff8a72ea9.1bb69167e16a3d0209eb310e758fcb36.jpeg";
    }
  };

  return (
    <Card
      key={product.id}
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
        onClick={() => onClickSearch(product.name)}
        sx={{
          flexGrow: 1,
          borderBottomLeftRadius: "0px",
          borderBottomRightRadius: "0px",
        }}
      >
        <CardContent>
          <CardHeader
            title={product.name ?? ""}
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
            <Typography variant="h6" color="textSecondary">
              <Box
                component="img"
                src={marketImage()}
                sx={{
                  maxWidth: "100px",
                  height: "auto",
                  borderRadius: "30px",
                }}
              />
            </Typography>
            <Box
              component="img"
              src={product.image_url ?? storeIconMap.default}
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
              ></Box>
            </Box>
          </Box>
        </CardContent>
      </CardActionArea>
      <CardActions
        sx={{
          width: "100%",
          padding: 0,
        }}
      ></CardActions>
    </Card>
  );
};

export default ProductCard;
