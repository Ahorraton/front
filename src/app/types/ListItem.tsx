import { Product } from "./Product";

export interface ListItemFromDB {
  id: number;
  name: string;
  price: number;
  created_at: string;
  market: string;
  image_url: string | null;
  ean: string;
  url: string | null;
  quantity: number;
  unit: string; // kg, Lts, g
  dir_sucursal: string | null;
  is_online: boolean;
  amount: number;
}

export interface ListItemType {
  ean: string;
  product?: Product;
  amount: number;
}

export interface ListState {
  name: string;
  items: ListItemType[];
}
