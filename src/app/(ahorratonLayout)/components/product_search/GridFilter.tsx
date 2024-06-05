import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import { Box, Button, Typography } from '@mui/material';
import { Checkbox, FormControlLabel } from '@mui/material';
import { Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Filters from "@/app/buscar/types/Filters";
import './filter_styles.css';

const ProductFilters = ({setter, fetchFunc}: {setter: (filters: any) => void, fetchFunc: (filters: Filters | null) => void}) => {
    const markets = ['coto', 'disco', 'vea', 'carrefour', 'jumbo', 'dia'];
    const [minPrice, setMinPrice] = useState<number>(0);
    const [maxPrice, setMaxPrice] = useState<number>(15000);
    const [selectedMarkets, setSelectedMarkets] = useState<string[]>(markets);

    const handleMarketChange = (market: string) => {
        if (selectedMarkets.includes(market)) {
            setSelectedMarkets(selectedMarkets.filter((m) => m !== market));
        } else {
            setSelectedMarkets([...selectedMarkets, market]);
        }
    };

    const handleApplyClick = () => {
        fetchFunc({
            markets: selectedMarkets,
            min_price: minPrice,
            max_price: maxPrice,
        });
    }

    return (
        <Accordion>
            <AccordionSummary
                sx={{
                    '& .MuiAccordionSummary-content': {
                        justifyContent: 'center',
                    }
                }}
                expandIcon={<ExpandMoreIcon />}
            >
                <h3>Filtros</h3>
            </AccordionSummary>
            <AccordionDetails>
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'center',
                }}>
                    <Typography variant='h6'>Supermercados</Typography>
                </Box>
                <Box className='accordion-row'>
                    {markets.map((market) => (
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
                <br />
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'center',
                }}>
                    <Typography variant='h6'>Precio</Typography>
                </Box>
                <br />
                <Box className='accordion-row'>
                    <TextField
                        label="Mínimo"
                        type="tel"
                        onChange={(e) => setMinPrice(Number(e.target.value))}
                        sx = {{
                            marginBottom: '5%',
                        }}
                    />
                    <TextField
                        label="Máximo"
                        type="tel"
                        onChange={(e) => setMaxPrice(Number(e.target.value))}
                        sx = {{
                            marginBottom: '5%',
                        }}
                    />
                </Box>
                <br/>
                <Box className='accordion-row'>
                    <Button
                        variant='contained'
                        color='secondary'
                        onClick={handleApplyClick}>
                        Aplicar
                    </Button>
                </Box>
            </AccordionDetails>
        </Accordion>
    );
};

export default ProductFilters;