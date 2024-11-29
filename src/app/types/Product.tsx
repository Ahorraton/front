export type Product = {
  id: number;
  name: string;
  price: number;
  created_at: string;
  market: string;
  image_url: string | null;
  image_urls: string | null;
  ean: string;
  url: string | null;
  quantity?: number;
  amount?: number;
  unit?: string; // kg, Lts, g
  dir_sucursal: string | null;
  is_online?: boolean;
};
