export interface ListItemType {
  ean: string;
  id?: string;
  name?: string;
  price?: number;
  quantity: number;
  market: string;
  dir_sucursal?: string;
  is_online?: false;
  image_url?: string;
  url?: string;
  unit: string; // kg, Lts, g
}

export interface ListState {
  name: string;
  items: ListItemType[];
}
