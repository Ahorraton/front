export interface ListItemType {
  id?: string;
  name?: string;
  quantity: number;
  price?: number;
  ean: string; // Changed to required
  image_url?: string;
  urls?: string;
  market_price?: string; // We have the price here (e.g. coto 2500)
}

export interface ListState {
  name: string;
  items: ListItemType[];
}
