export type StoreNames =
  | "dia"
  | "carrefour"
  | "vea"
  | "coto"
  | "jumbo"
  | "disco"
  | "default";

const storeIconMap: Record<StoreNames, string> = {
  dia: "/images/logos/logo_dia.svg",
  carrefour: "/images/logos/logo_carrefour.svg",
  vea: "/images/logos/logo_vea.png",
  coto: "/images/logos/logo_coto.svg",
  jumbo: "/images/logos/logo_jumbo.png",
  disco: "/images/logos/logo_disco.svg",
  default: "/images/stock_product/rat.png",
};

export const getStoreIcon = (storeName: string): string => {
  if (storeName in storeIconMap) {
    return storeIconMap[storeName as StoreNames];
  } else {
    return storeIconMap["default"];
  }
};
