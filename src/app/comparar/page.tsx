"use client";
import React, { Suspense, useEffect, useState } from "react";
import {
  Box,
  Grid,
  Button,
  Typography,
  AccordionSummary,
  Accordion,
  Breadcrumbs,
  Link,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MetaDataContainer from "@/app/global_layout/MetaDataContainer";
import { fetch_async } from "@/utils/common/fetch_async";
import ProductItems from "../types/ProductItems";
import "./compare.css";
import { useSearchParams } from "next/navigation";
import ProductCardSearch from "./cardComponent";
import { useDispatch, useSelector } from "react-redux";
import { addItem, deleteItem } from "@/redux/store/listSlice";
import Filters from "../miLista/Filters";
import { ProductView } from "../(ahorratonLayout)/components/product_view/ProductView";

import SelectedItemAlert from "./selectedItemAlert";
import NoProductsFound from "@/app/error_pages/NoProductsFound";
import ErrorPage from "@/app/error_pages/ErrorComponent";
import { LoadingHamsterScreen } from "@/app/loadingScreens/loadingHamster/LoadingHamster";
import Loading from "@/app/loadingScreens/loading";
import { process_prod_item } from "./utils/process_prod_item";
import { Product } from "@/app/types/Product";
import { getCheapestItems } from "@/app/miLista/utils/cheapestItems";
import { ListItemType } from "../types/ListItem";
import { RootState } from "@/redux/store";

const LIMIT = 8;

const Compare = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [products, setProducts] = useState<ProductItems[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<ProductItems[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loadMore, setLoadMore] = useState<boolean>(false);
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
  const [productPage, setProductPage] = useState<ProductItems | null>(null);
  const user = useSelector((state: RootState) => state.user);
  const savedProducts = useSelector((state: RootState) => state.list.items);

  const [showAlert, setShowAlert] = useState<Boolean>(false);
  const [alertMessage, setAlertMessage] = useState<string>("");
  const [successStatus, setSuccessStatus] = useState<boolean>(false);

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
      const products_result: ProductItems[] = res.products ? res.products : [];
      setLoading(false);
      setLoadMore(products.length + products_result.length < res.count);
      setProducts([...products, ...products_result]);
      setFilteredProducts([...products, ...products_result]);
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
      const products_result: ProductItems[] = res.products ? res.products : [];
      setLoadMore(products.length + products_result.length < res.count);
      setProducts([...products, ...products_result]);
      setFilteredProducts(getFilteredProducts(selectedMarkets));
    } catch (e: unknown) {
      setError("error");
      setLoading(false);
      throw new Error(String(e));
    }
  };

  const handleAddProduct = (productItem: ProductItems) => {
    // if (!user.isLoggedIn) {
    //   console.error("Not logged in");
    //   setShowAlert(true);
    //   setAlertMessage("No estas loggeado");
    //   setSuccessStatus(false);

    //   return;
    // }
    const prod: Product[] = process_prod_item(productItem);

    const cheapestProducts: ListItemType[] = getCheapestItems(prod);

    const productToSave: ListItemType = {
      ean: cheapestProducts[0].ean,
      name: cheapestProducts[0].name,
      product: cheapestProducts[0].product,
      amount: 1,
    };
    dispatch(addItem(productToSave));
    setShowAlert(true);
    setAlertMessage("Agregado a lista");
    setSuccessStatus(true);
  };

  const handleRemoveProduct = (productItem: ProductItems) => {
    const prod: Product[] = process_prod_item(productItem);

    const cheapestProducts: ListItemType[] = getCheapestItems(prod);
    const ean_to_remove =cheapestProducts[0].ean;

    dispatch(deleteItem(ean_to_remove));
    setShowAlert(true);
    setAlertMessage("Quitado de lista");
    setSuccessStatus(true);
  };

  const getFilteredProducts = (markets: string[]) => {
    let filtered_products = products.map((product) => {
      const marketPrices = product.market_price.split(", ");
      const namesList = product.names_list.split(", ");
      const urls = product.urls.split(", ");

      const filteredMarkets: string[] = [];
      const filteredNames: string[] = [];
      const filteredUrls: string[] = [];

      marketPrices.forEach((price, index) => {
        const [market] = price.split(" ");
        if (markets.includes(market)) {
          filteredMarkets.push(price);
          filteredNames.push(namesList[index] || "");
          filteredUrls.push(urls[index] || "");
        }
      });

      if (filteredMarkets.length == 0) {
        return null;
      }

      (product.names_list = filteredNames.join(", ")),
        (product.market_price = filteredMarkets.join(", ")),
        (product.urls = filteredUrls.join(", "));

      return product;
    });

    filtered_products = filtered_products.filter((p) => p !== null);
    return filtered_products as ProductItems[];
  };

  const handleMarketChange = (selectedMarket: string) => {
    let markets = selectedMarkets;
    if (selectedMarkets.includes(selectedMarket)) {
      markets = selectedMarkets.filter((m) => m !== selectedMarket);
    } else {
      markets = [...selectedMarkets, selectedMarket];
    }

    setSelectedMarkets(markets);
    setFilteredProducts(getFilteredProducts(markets));
  };

  return (
    <MetaDataContainer
      title="Comparar"
      description="Compara precios de productos"
    >
      <Box mt={5}>
        <Box className="compare-layout">
          {loading ? (
            <Box className="loading-layout">
              <LoadingHamsterScreen />
            </Box>
          ) : error ? (
            <ErrorPage />
          ) : products.length === 0 && !loading && !error ? (
            <NoProductsFound />
          ) : (
            <Box className="compare-layout">
              <Breadcrumbs aria-label="breadcrumb">
                <Link color="inherit" href="/">
                  Inicio
                </Link>
                <Typography color="textPrimary">Comparar</Typography>
              </Breadcrumbs>
              <Filters
                selectedMarkets={selectedMarkets}
                handleMarketChange={handleMarketChange}
              />
              <Grid container spacing={2} py={4}>
                {filteredProducts.map((product: ProductItems) => {
                  const products = process_prod_item(product);

                  if (products.length === 0) {
                    return <></>;
                  }

                  return (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={product.ean}>
                      <ProductCardSearch
                        product_items={product}
                        products={products}
                        savedProducts={savedProducts}
                        addProduct={handleAddProduct}
                        removeProduct={handleRemoveProduct}
                        setProductPage={setProductPage}
                      />
                    </Grid>
                  );
                })}
              </Grid>

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
            </Box>
          )}

          {showAlert && (
            <Box className="alert-box" id="alert-box">
              <SelectedItemAlert
                setShowAlert={setShowAlert}
                alertMessage={alertMessage}
                success={successStatus}
              />
            </Box>
          )}

          {productPage && (
            <ProductView
              product_items={productPage}
              addProduct={handleAddProduct}
              onClose={() => setProductPage(null)}
            />
          )}
        </Box>
      </Box>
    </MetaDataContainer>
  );
};

const CompareWithSuspense = () => (
  <Suspense>
    <Compare />
  </Suspense>
);

export default CompareWithSuspense;
