import { Product } from "@/app/types/Product";

const SUPERMARKETS: string[] = [
  "carrefour",
  "coto",
  "dia",
  "vea",
  "disco",
  "jumbo",
];

export function calculateTotalPrice(
  products: Product[],
  selectedMarkets?: string[]
): number {
  const filteredProducts = products.filter((product) =>
    (selectedMarkets ?? SUPERMARKETS).includes(product.market)
  );

  const cheapestProducts = Object.values(
    filteredProducts.reduce((acc, product) => {
      if (!acc[product.ean] || acc[product.ean].price > product.price) {
        acc[product.ean] = product;
      }
      return acc;
    }, {} as { [key: string]: Product })
  );

  const totalPrice = cheapestProducts.reduce(
    (total, product) => total + product.price * (product.amount || 0),
    0
  );

  return totalPrice;
}
