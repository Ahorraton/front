import React from 'react';
import { Box, TextField, Checkbox, Typography, Button } from '@mui/material';
import './price_filter.css';

type PriceFilterProps = {
    minPrice?: number | undefined;
    maxPrice?: number | undefined;
    onlyOnlineMarkets?: boolean;
    handleMinPriceChange?: (price: number, type: string) => void;
    handleMaxPriceChange?: (price: number, type: string) => void;
    handleOnlineMarketChange?: () => void;
};

const PriceFilter: React.FC<PriceFilterProps> = ({
    minPrice,
    maxPrice,
    onlyOnlineMarkets,
    handleMinPriceChange,
    handleMaxPriceChange,
    handleOnlineMarketChange,
}) => {

    return (
        <Box id='filtro-precios' className='price-filter-layout'>
            <Box className='price-filter'
            >
                <Box padding='3%'>
                    <TextField
                        variant='filled'
                        type='number'
                        label='Precio Minimo'
                        value={minPrice}
                        onChange={(e) => handleMinPriceChange && handleMinPriceChange(parseInt(e.target.value), 'min')}
                        inputProps={{
                            min: 0,
                            inputMode: 'numeric',
                        }}
                        sx={{
                            '& .MuiFilledInput-root': {
                                backgroundColor: 'rgba(255, 255, 255, 1)',
                            },
                            '& .MuiFilledInput-underline:before': {
                                borderBottomColor: '#0289d1',
                            },
                            '& .MuiFilledInput-underline:after': {
                                borderBottomColor: '#0289d1',
                            },
                            '& .MuiInputLabel-root.Mui-focused': {
                                color: '#0289d1',
                            },
                            '& input[type=number]::-webkit-inner-spin-button, & input[type=number]::-webkit-outer-spin-button': {
                                appearance: 'none',
                                margin: 0,
                            },
                            '& input[type=number]': {
                                appearance: 'textfield',
                            },
                        }}
                    />
                </Box>
                <Box padding='3%'>
                    <TextField
                        variant='filled'
                        type='number'
                        label='Precio Maximo'
                        value={maxPrice}
                        onChange={(e) => handleMaxPriceChange && handleMaxPriceChange(parseInt(e.target.value), 'max')}
                        inputProps={{
                            min: 0,
                            inputMode: 'numeric',
                        }}
                        sx={{
                            '& .MuiFilledInput-root': {
                                backgroundColor: 'rgba(255, 255, 255, 1)',
                            },
                            '& .MuiFilledInput-underline:before': {
                                borderBottomColor: '#0289d1',
                            },
                            '& .MuiFilledInput-underline:after': {
                                borderBottomColor: '#0289d1',
                            },
                            '& .MuiInputLabel-root.Mui-focused': {
                                color: '#0289d1',
                            },
                            '& input[type=number]::-webkit-inner-spin-button, & input[type=number]::-webkit-outer-spin-button': {
                                appearance: 'none',
                                margin: 0,
                            },
                            '& input[type=number]': {
                                appearance: 'textfield',
                            },
                        }}
                    />
                </Box>
                <Box className='checkbox-container'>
                    <Box
                        className='checkbox'
                        onClick={() => handleOnlineMarketChange && handleOnlineMarketChange()}
                        sx={{ cursor: 'pointer' }}
                    >
                        <Box>
                            <Checkbox checked={onlyOnlineMarkets} color={'info'} />
                        </Box>
                        <hr />
                        <Box>
                            <Typography variant='body1'>Solo en supermercados online</Typography>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default PriceFilter;