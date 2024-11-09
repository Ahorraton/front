import React from "react";
import { Box, FormControlLabel, Checkbox } from "@mui/material";
import IconMarket from "@/utils/storeIconMap/IconMarket";

type FiltersProps = {
  selectedMarkets: string[];
  handleMarketChange: (market: string) => void;
};

const Filters: React.FC<FiltersProps> = ({
  selectedMarkets,
  handleMarketChange,
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexWrap: "wrap",
      }}
    >
      {["carrefour", "coto", "dia", "vea", "disco", "jumbo"].map((market) => (
        // <FormControlLabel
        //     key={market}
        //     control={
        //         <Checkbox
        //             checked={selectedMarkets.includes(market)}
        //             onChange={() => handleMarketChange(market)}
        //         />
        //     }
        //     label={market.charAt(0).toUpperCase() + market.slice(1)}
        // />
        <Box
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
  );
};

export default Filters;
