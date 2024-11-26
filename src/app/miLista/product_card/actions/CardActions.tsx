import React from 'react';
import { Box, IconButton, Typography } from '@mui/material';
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteIcon from "@mui/icons-material/Delete";
import './actions.css';

interface CardActionsProps {
    product: {
        ean: string;
        amount: number;
    };
    handleRemoveAmount: (ean: string) => void;
    handleAddAmount: (ean: string) => void;
    handleDeleteItem: (ean: string) => void;
}

const CardActions: React.FC<CardActionsProps> = ({ product, handleRemoveAmount, handleAddAmount, handleDeleteItem }) => {
    return (
        <Box className='actions-layout'>
            <Box>
                <IconButton onClick={() => handleDeleteItem(product.ean)}>
                    <DeleteIcon />
                </IconButton>
            </Box>
            <Box className='actions-quantity'>
                <IconButton onClick={() => handleRemoveAmount(product.ean)}>
                    <RemoveIcon />
                </IconButton>
                <Typography variant="body1" style={{ margin: "0 10px" }}>
                    {product.amount}
                </Typography>
                <IconButton onClick={() => handleAddAmount(product.ean)}>
                    <AddIcon />
                </IconButton>
            </Box>
        </Box>
    );
};

export default CardActions;
