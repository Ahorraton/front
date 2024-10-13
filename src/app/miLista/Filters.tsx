import React from 'react';
import { Box, FormControlLabel, Checkbox } from '@mui/material';

type FiltersProps = {
    selectedMarkets: string[];
    handleMarketChange: (market: string) => void;
};

const Filters: React.FC<FiltersProps> = ({ selectedMarkets, handleMarketChange }) => {
    return (
        <Box sx={{
            display: 'flex',
            justifyContent: 'center',
            flexWrap: 'wrap'
        }}>
            {['carrefour', 'coto', 'dia', 'vea', 'disco', 'jumbo'].map((market) => (
                <FormControlLabel
                    key={market}
                    control={
                        <Checkbox
                            checked={selectedMarkets.includes(market)}
                            onChange={() => handleMarketChange(market)}
                        />
                    }
                    label={market.charAt(0).toUpperCase() + market.slice(1)}
                />
            ))}
        </Box>
    );
};

export default Filters;
