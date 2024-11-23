export type Product = {
  ean: string;
  id: number;
  name: string;
  price: number;
  quantity?: number;
  unit?: string; // kg, Lts, g
  market: string;
  dir_sucursal?: string;
  is_online?: string;
  image_url: string | null;
  url: string | null;
  created_at: string;
};
