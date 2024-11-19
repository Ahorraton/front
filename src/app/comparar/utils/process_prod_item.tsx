import { Product } from "@/app/types/Product";
import ProductItems from "@/app/types/ProductItems";

export function process_prod_item(product_items: ProductItems): Product[] {
  const titles = product_items.names_list.split(",");

  const price_and_market = product_items.market_price
    .split(",")
    .map((pair) => pair.trim());

  const markets = price_and_market.map(
    (price_market) => price_market.split(" ")[0]
  );

  const prices = price_and_market.map((price_market) =>
    parseFloat(price_market.split(" ")[1])
  );

  const urls = product_items.urls.split(",");
  const dir_sucursal = product_items.dir_sucursal?.split(",");

  const products: Product[] = titles
    .map((prod_name, index) => {
      return {
        id: Number(product_items.ean),
        name: prod_name,
        price: Number(prices[index]),
        price_per_unit: null,
        created_at: "",
        market: markets[index],
        image_url: null,
        ean: product_items.ean,
        url: urls[index],
        dir_sucursal: dir_sucursal ? dir_sucursal[index] : "",
      };
    })
    .filter((product) => !isNaN(product.price))
    .sort((a, b) => a.price - b.price);

  return products;
}

export function get_min_price(product_items: Product[]): number {
  return Math.min(
    ...product_items
      .map((product) => product.price)
      .filter((price) => !isNaN(price))
  );
}
