import React from 'react';
import { Box, Typography } from '@mui/material';

type TotalPriceProps = {
    totalPrice: number;
};

const TotalPrice: React.FC<TotalPriceProps> = ({ totalPrice }) => {
    return (
        <Box
            sx={{
                backgroundColor: 'white',
                padding: '16px',
                borderRadius: '8px',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                textAlign: 'center',
                marginBottom: '16px'
            }}
        >
            <Typography variant="h4" component="div" sx={{ fontWeight: 'bold', color: '#ff5722' }}>
                Total: ${totalPrice}
            </Typography>
        </Box>
    );
};

export default TotalPrice;
