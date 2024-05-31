import React, { useState } from 'react';
import { Checkbox, FormControlLabel, Grid, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const CheckBoxGrid = () => {
    const markets = ['coto', 'disco', 'vea', 'carrefour', 'jumbo', 'dia'];
    const [selectedMarkets, setSelectedMarkets] = useState<string[]>(markets);

    const handleMarketChange = (market: string) => {
        if (selectedMarkets.includes(market)) {
            setSelectedMarkets(selectedMarkets.filter((m) => m !== market));
        } else {
            setSelectedMarkets([...selectedMarkets, market]);
        }
    };

    return (
        <Accordion>
            <AccordionSummary
                sx={{
                    '& .MuiAccordionSummary-content': {
                        justifyContent: 'center'
                    }
                }}
                expandIcon={<ExpandMoreIcon />}
            >
                <h3>Supermercados</h3>
            </AccordionSummary>
            <AccordionDetails>
                <Grid container spacing={2}>
                    {markets.map((market) => (
                        <Grid item xs={6} sm={4} md={3} key={market}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={selectedMarkets.includes(market)}
                                        onChange={() => handleMarketChange(market)}
                                    />
                                }
                                label={market.charAt(0).toUpperCase() + market.slice(1)}
                            />
                        </Grid>
                    ))}
                </Grid>
            </AccordionDetails>
        </Accordion>
    );
};

export default CheckBoxGrid;