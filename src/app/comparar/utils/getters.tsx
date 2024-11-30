import { Product } from "@/app/types/Product";
import ProductItems from "@/app/types/ProductItems";

export function get_longest_title(product_items: ProductItems): string {
  const titles = product_items.names_list.split(",");
  const longestTitle = titles.reduce((longest, current) => {
    return current.length > longest.length ? current : longest;
  }, "");

  return longestTitle;
}

export function get_image_url(product_items: ProductItems): string {
  const image_urls_list = product_items.image_urls.split(",");
  const image_url = image_urls_list.find(url => !url.includes("preciosclaros"));

  return image_url ?? product_items.image_url;
}

export function get_cheapest_product(products: Product[]): Product {
  const cheapestProduct = products.reduce((minProduct, currentProduct) => {
    return currentProduct.price < minProduct.price ? currentProduct : minProduct;
  }, products[0]);

  return cheapestProduct;
}
