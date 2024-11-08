"use client";
import React, { useEffect, useState } from "react";
import {
  Box,
  Grid,
  Button,
  Typography,
  CircularProgress,
  AccordionSummary,
  Accordion,
  Alert,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ProductPaperAle from "@/app/comparar/ProductPaperAle";
import MetaDataContainer from "@/app/global_layout/MetaDataContainer";
import { fetch_async } from "@/utils/common/fetch_async";
import Product from "./types/Product";

import "./compare.css";
import { useSearchParams } from "next/navigation";
import ProductCardSearch from "./cardComponent";
import { useDispatch } from "react-redux";
import { addItem } from "@/redux/store/listSlice";
import Filters from "../miLista/Filters";
import { ProductView } from "../(ahorratonLayout)/components/product_view/ProductView";
import { LoadingCompareScreen } from "./loadingScreens/LoadingPrices";
import SelectedItemAlert from "./selectedItemAlert";

const LIMIT = 8;

const Compare = () => {
  const [loading, setLoading] = React.useState<boolean>(true);
  const [products, setProducts] = React.useState<Product[]>([]);
  const [error, setError] = React.useState<string | null>(null);
  const [loadMore, setLoadMore] = React.useState<boolean>(false);
  const dispatch = useDispatch();
  const query = useSearchParams().get("query");
  const [selectedMarkets, setSelectedMarkets] = useState<string[]>([
    "carrefour",
    "coto",
    "dia",
    "vea",
    "disco",
    "jumbo",
  ]);
  const [productPage, setProductPage] = useState<Product | null>(null);

  const [showAlert, setShowAlert] = useState<Boolean>(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setProducts([]);
    if (query === null) {
      return;
    }

    try {
      const res = await fetch_async(
        `/products_ean/${query}?offset=0&limit=${LIMIT}`
      );
      const products_result: Product[] = res.products ? res.products : [];
      setLoading(false);
      setLoadMore(products.length + products_result.length < res.count);
      setProducts([...products, ...products_result]);
      console.log("products_result", products_result);
    } catch (e: unknown) {
      setError("error");
      setLoading(false);
      throw new Error(String(e));
    }
  };

  const fetchMoreProducts = async () => {
    try {
      const res = await fetch_async(
        `/products_ean/${query}?offset=${products.length}&limit=${LIMIT}`
      );
      const products_result: Product[] = res.products ? res.products : [];
      setLoadMore(products.length + products_result.length < res.count);
      setProducts([...products, ...products_result]);
    } catch (e: unknown) {
      setError("error");
      setLoading(false);
      throw new Error(String(e));
    }
  };

  const handleAddProduct = (product: Product) => {
    const productToSave = {
      ...product,
      name: product.names_list,
      quantity: 1,
    };
    dispatch(addItem(productToSave));
  };

  const handleMarketChange = (market: string) => {
    if (selectedMarkets.includes(market)) {
      setSelectedMarkets(selectedMarkets.filter((m) => m !== market));
    } else {
      setSelectedMarkets([...selectedMarkets, market]);
    }
  };

  return (
    <MetaDataContainer
      title="Comparar"
      description="Compara precios de productos"
    >
      <Box className="compare-layout">
        {loading ? (
          <Box className="loading-layout">
            <LoadingCompareScreen />
          </Box>
        ) : (
          <Box className="compare-layout">
            <Accordion>
              <AccordionSummary
                sx={{
                  "& .MuiAccordionSummary-content": {
                    justifyContent: "center",
                  },
                }}
                expandIcon={<ExpandMoreIcon />}
              >
                <Typography variant="h3">Filtros</Typography>
              </AccordionSummary>
              <Filters
                selectedMarkets={selectedMarkets}
                handleMarketChange={handleMarketChange}
              />
            </Accordion>
          </Box>
        )}
        {error && (
          <Box className="error-layout">
            <Typography variant="h5" color="error">
              Error al cargar los productos
            </Typography>
            <Typography variant="body1" color="error">
              Por favor intente mas tarde.
            </Typography>
          </Box>
        )}

        <Grid container spacing={2} py={4}>
          {products.map((product: Product) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={product.ean}>
              <ProductCardSearch
                product={product}
                addProduct={handleAddProduct}
                setProductPage={setProductPage}
                setShowAlert={setShowAlert}
              />
            </Grid>
          ))}
        </Grid>

        {showAlert && (
          <Box className="alert-box" id="alert-box">
            <SelectedItemAlert setShowAlert={setShowAlert} />
          </Box>
        )}

        {productPage && (
          <ProductView
            product={productPage}
            onClose={() => setProductPage(null)}
          />
        )}

        {loadMore && (
          <Box display="flex" justifyContent="center" py="1%">
            <Button
              variant="contained"
              color="secondary"
              onClick={fetchMoreProducts}
            >
              Cargar más
            </Button>
          </Box>
        )}
        {products.length === 0 && !loading && !error && (
          <Box display="flex" justifyContent="center">
            <Typography variant="h5">No se encontraron productos</Typography>
          </Box>
        )}
      </Box>
    </MetaDataContainer>
  );
};

export default Compare;
