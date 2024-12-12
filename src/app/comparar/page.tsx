"use client";
import React, { Suspense, useEffect, useState } from "react";
import {
  Box,
  Grid,
  Button,
  Typography,
  Breadcrumbs,
  Link,
  Modal,
} from "@mui/material";
import TuneIcon from '@mui/icons-material/Tune';
import MetaDataContainer from "@/app/global_layout/MetaDataContainer";
import { fetch_async } from "@/utils/common/fetch_async";
import ProductItems from "../types/ProductItems";
import "./compare.css";
import ProductCardSearch from "./cardComponent";
import { useDispatch, useSelector } from "react-redux";
import { addItem, deleteItem } from "@/redux/store/listSlice";
import Filters from "../miLista/Filters";
import { ProductView } from "../(ahorratonLayout)/components/product_view/ProductView";

import SelectedItemAlert from "./selectedItemAlert";
import NoProductsFound from "@/app/error_pages/NoProductsFound";
import ErrorPage from "@/app/error_pages/ErrorComponent";
import { LoadingHamsterScreen } from "@/app/loadingScreens/loadingHamster/LoadingHamster";
import { process_prod_item } from "./utils/process_prod_item";
import { Product } from "@/app/types/Product";
import { getCheapestItems } from "@/app/miLista/utils/cheapestItems";
import { ListItemType } from "../types/ListItem";
import { RootState } from "@/redux/store";

const LIMIT = 8;

const Compare = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [products, setProducts] = useState<ProductItems[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loadMore, setLoadMore] = useState<boolean>(false);
  const dispatch = useDispatch();
  const query = typeof window !== "undefined" ? new URLSearchParams(window.location.search).get("query") || "" : "";
  const [selectedMarkets, setSelectedMarkets] = useState<string[]>([]);
  const [productPage, setProductPage] = useState<ProductItems | null>(null);
  const savedProducts = useSelector((state: RootState) => state.list.items);
  const [showAlert, setShowAlert] = useState<Boolean>(false);
  const [alertMessage, setAlertMessage] = useState<string>("");
  const [filterModal, setFilterModal] = useState<boolean>(false);
  const [successStatus, setSuccessStatus] = useState<boolean>(false);
  const buildQueryParams = () => {
    let query_params = `limit=${LIMIT}`;
    if (minPrice) {
      query_params += `&min_price=${minPrice}`;
    }
    if (maxPrice) {
      query_params += `&max_price=${maxPrice}`;
    }
    if (onlyOnlineFilter) {
      query_params += `&is_online=true`;
    }
    if (selectedMarkets.length >= 0) {
      query_params += `&markets=${selectedMarkets.join(",")}`;
    }
    return query_params;
  }
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setProducts([]);
    if (query === null) {
      return;
    }
    try {
      const query_params = buildQueryParams()
      const res = await fetch_async(
        `/products_ean/${query}?offset=0&${query_params}`
      );
      const products_result: ProductItems[] = res.products ? res.products : [];
      setLoading(false);
      setLoadMore(products.length + products_result.length < res.count);
      setProducts(products_result);
    } catch (e: unknown) {
      setError("error");
      setLoading(false);
      throw new Error(String(e));
    }
  };

  const fetchMoreProducts = async () => {
    try {
      const query_params = buildQueryParams()
      const res = await fetch_async(
        `/products_ean/${query}${query_params}&offset=${products.length}`
      );
      const products_result: ProductItems[] = res.products ? res.products : [];
      setLoadMore(products.length + products_result.length < res.count);
      setProducts([...products, ...products_result]);
    } catch (e: unknown) {
      setError("error");
      setLoading(false);
      throw new Error(String(e));
    }
  };

  const handleAddProduct = (productItem: ProductItems) => {
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
    setAlertMessage("Se agrego el producto a la lista.");
    setSuccessStatus(true);
  };

  const handleRemoveProduct = (productItem: ProductItems) => {
    const prod: Product[] = process_prod_item(productItem);

    const cheapestProducts: ListItemType[] = getCheapestItems(prod);
    const ean_to_remove =cheapestProducts[0].ean;

    dispatch(deleteItem(ean_to_remove));
    setShowAlert(true);
    setAlertMessage("Se quitó el producto de la lista.");
    setSuccessStatus(true);
  };

  const [onlyOnlineFilter, setOnlyOnlineFilter] = useState<boolean>(true);
  const [minPrice, setMinPrice] = useState<number | undefined>(undefined);
  const [maxPrice, setMaxPrice] = useState<number | undefined>(undefined);
  useEffect(() => {
    setLoading(true);
    const timeout = setTimeout(() => {
      fetchProducts();
    }, 1000);
  
    return () => clearTimeout(timeout);
  
  }, [minPrice, maxPrice, onlyOnlineFilter, selectedMarkets]);


  const handleMarketChange = (selectedMarket: string) => {
    if (selectedMarkets.includes(selectedMarket)) {
      setSelectedMarkets(selectedMarkets.filter((m) => m !== selectedMarket));
    } else {
      setSelectedMarkets([...selectedMarkets, selectedMarket]);
    }
  };

  return (
    <MetaDataContainer
      title="Comparar"
      description="Compara precios de productos"
    >
      <Box mt={5}>
        <Box className="compare-layout">
          <Box 
            id='breadcrums_and_filter'
            display='flex'
            flexDirection='row'
            justifyContent='space-between'
            alignItems='center'>
            <Breadcrumbs aria-label="breadcrumb">
              <Link color="inherit" href="/">
                <strong>Inicio</strong>
              </Link>
              <Typography color="textPrimary"><strong>Comparar</strong></Typography>
            </Breadcrumbs>
            <Button 
              variant="contained"
              onClick={() => setFilterModal(true)} 
              sx={{
              '&:hover': {
                backgroundColor: 'darkblue',
              },
            }}
            >
              <TuneIcon />
              Filtros
            </Button>
          </Box>
          <hr />
          <Modal
            open={filterModal}
            onClose={() => setFilterModal(false)}
            sx={{
              position: { sm: 'block' },
              display: { sm: 'flex' },
              alignItems: { sm: 'center' },
              justifyContent: { sm: 'center' },
              boxShadow: 24,
              overflow: 'scroll',
            }}
            >
            <Filters
              selectedMarkets={selectedMarkets}
              handleMarketChange={handleMarketChange}
              closeFilterModal={() => setFilterModal(false)}
              minPrice={minPrice}
              maxPrice={maxPrice}
              onlyOnlineMarkets={onlyOnlineFilter}
              handleMinPriceChange={(price) => setMinPrice(price)}
              handleMaxPriceChange={(price) => setMaxPrice(price)}
              handleOnlineMarketChange={() =>
                setOnlyOnlineFilter(!onlyOnlineFilter)
              }
            />
            </Modal>
          {loading ? (
            <Box className="loading-layout">
              <LoadingHamsterScreen />
            </Box>
          ) : error ? (
            <ErrorPage />
          ) : products.length === 0 ? (
            <NoProductsFound />
          ) : (
            <Box className="compare-layout">
              { products.length === 0 && (
                <NoProductsFound />
              )}
              <Grid container spacing={2} py={4}>
                {products.map((product: ProductItems) => {
                  const prods = process_prod_item(product);

                  if (prods.length === 0) {
                    return <></>;
                  }

                  return (
                    <Grid display='flex' alignItems='center' item xs={12} sm={6} md={4} lg={3} key={product.ean}>
                      <ProductCardSearch
                        product_items={product}
                        products={prods}
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
              savedProducts={savedProducts}
              addProduct={handleAddProduct}
              removeProduct={handleRemoveProduct}
              onClose={() => setProductPage(null)}
            />
          )}
        </Box>
      </Box>
    </MetaDataContainer>
  );
};

const CompareWithSuspense = () => (
  <Compare />
);

export default CompareWithSuspense;
