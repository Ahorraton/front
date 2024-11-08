"use client";
import React from "react";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Box, Typography, Button } from "@mui/material";
import PageContainer from "../(ahorratonLayout)/components/container/PageContainer";
import ProductFilters from "../(ahorratonLayout)/components/product_search/GridFilter";
import { fetch_async } from "../../utils/common/fetch_async";
import Product from "../(ahorratonLayout)/components/types/Product";
import FeaturedProducts from "../(ahorratonLayout)/components/product_search/ProductGrid";
import Filters from "@/app/buscar/types/Filters";
import "./search_page.css";

const LIMIT = 8;

const toQueryParams = (filters: Filters) => {
  let query = "";
  if (filters.markets.length > 0) {
    query += `&markets=${filters.markets.join(",")}`;
  }
  if (filters.min_price !== null) {
    query += `&min_price=${filters.min_price}`;
  }
  if (filters.max_price !== null) {
    query += `&max_price=${filters.max_price}`;
  }
  return query;
};

const Search = () => {
  const [error, setError] = React.useState<string | null>(null);
  const [products, setProducts] = React.useState<Product[]>([]);
  const [loadMore, setLoadMore] = React.useState<boolean>(false);
  /**This filters is only used for the fetchMoreProducts function
   * it saves the filters done in the children component
   * even if IT re-renders.
   * */
  const [filters, setFilters] = React.useState<Filters | null>({
    markets: [],
    min_price: null,
    max_price: null,
  });
  const searchParams = useSearchParams();
  const query = searchParams.get("query");

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async (filters_fetch: Filters | null = null) => {
    setProducts([]);
    if (query === null) {
      return;
    }
    let uri = "/products/" + query + `?offset=0` + `&limit=${LIMIT}`;
    if (filters_fetch) {
      const filter_query = toQueryParams(filters_fetch);
      uri += filter_query;
    }
    try {
      const res = await fetch_async(uri);
      const products_result: Product[] = res.products ? res.products : [];
      setLoadMore(products_result.length < res.count);
      setProducts(products_result);
      setFilters(filters_fetch);
    } catch (e: unknown) {
      setError("error");
      throw new Error(String(e));
    }
  };

  const fetchMoreProducts = async () => {
    let uri =
      "/products/" + query + `?offset=${products.length}` + `&limit=${LIMIT}`;
    if (filters) {
      const filter_query = toQueryParams(filters);
      uri += filter_query;
    }
    try {
      const res = await fetch_async(uri);
      const products_result: Product[] = res.products ? res.products : [];
      setLoadMore(products.length + products_result.length < res.count);
      setProducts([...products, ...products_result]);
    } catch (e: unknown) {
      setError("error");
      throw new Error(String(e));
    }
  };

  return (
    <PageContainer title="Buscar" description="Buscar">
      <Box className="page-layout">
        <ProductFilters fetchFunc={fetchProducts} />
        <br />
        <Box>
          {products.length === 0 || error ? (
            <Typography variant="h6" align="center">
              No se encontraron productos.
            </Typography>
          ) : (
            <FeaturedProducts products={products} />
          )}
        </Box>
        <br />
        {loadMore && (
          <Box display="flex" justifyContent="center">
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
    </PageContainer>
  );
};

export default Search;
