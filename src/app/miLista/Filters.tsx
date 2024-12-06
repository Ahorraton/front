import React from "react";
import { Box } from "@mui/material";
import IconMarket from "@/utils/storeIconMap/IconMarket";
import PriceFilter from "./price_filter/PriceFilter";


type FiltersProps = {
  selectedMarkets: string[];
  handleMarketChange: (market: string) => void;
  minPrice?: number;
  maxPrice?: number;
  onlyOnlineMarkets?: boolean;
  handleMinPriceChange?: (price: number, type: string) => void;
  handleMaxPriceChange?: (price: number, type: string) => void;
  handleOnlineMarketChange?: () => void;
};

const Filters: React.FC<FiltersProps> = ({
  selectedMarkets,
  handleMarketChange,
  minPrice,
  maxPrice,
  onlyOnlineMarkets,
  handleMinPriceChange,
  handleMaxPriceChange,
  handleOnlineMarketChange,
}) => {
  const prices: boolean = (
    onlyOnlineMarkets !== undefined &&
    handleMinPriceChange !== undefined &&
    handleMaxPriceChange !== undefined &&
    handleOnlineMarketChange !== undefined
  );
  return (
    <Box sx = {{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      backgroundColor: 'rgba(255, 255, 255, 1)',
      boxShadow: 3,
    }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        {["carrefour", "coto", "dia", "vea", "disco", "jumbo"].map((market) => (
          <Box
            key={market}
            component="div"
            sx={{
              margin: "30px",
              cursor: "pointer",
              border: selectedMarkets.includes(market)
                ? "2px solid green"
                : "2px solid transparent",
              padding: "30px",
              borderRadius: "50%",
            }}
            onClick={() => handleMarketChange(market)}
          >
            <IconMarket icon={market} size="large" />
          </Box>
        ))}
      </Box>
      {prices && (
        <PriceFilter
          minPrice={minPrice}
          maxPrice={maxPrice}
          onlyOnlineMarkets={onlyOnlineMarkets}
          handleMinPriceChange={handleMinPriceChange}
          handleMaxPriceChange={handleMaxPriceChange}
          handleOnlineMarketChange={handleOnlineMarketChange}
        />
      )}
    </Box>
  );
};

export default Filters;
