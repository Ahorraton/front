import { ListItemType } from "@/app/types/ListItem";
import { Product } from "@/app/types/Product";

const SUPERMARKETS: string[] = [
  "carrefour",
  "coto",
  "dia",
  "vea",
  "disco",
  "jumbo",
];

export function getCheapestItems(
  products: Product[],
  selectedMarkets?: string[]
): MapIterator<ListItemType> {
  const filteredProducts = products.filter((product) =>
    (selectedMarkets ?? SUPERMARKETS).includes(product.market)
  );

  const cheapestItems: Product[] = Object.values(
    filteredProducts.reduce((acc, product) => {
      if (!acc[product.ean] || acc[product.ean].price > product.price) {
        acc[product.ean] = product;
      }
      return acc;
    }, {} as { [key: string]: Product })
  );

  const cheapestItemsMap: Map<string, ListItemType> = new Map();
  cheapestItems.forEach((item: Product) => {
    cheapestItemsMap.set(item.ean, {
      product: { ...item },
      name: item.name,
      ean: item.ean,
      amount: item.amount ?? 0,
    });
  });

  return cheapestItemsMap.values();
}
