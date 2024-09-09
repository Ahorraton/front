import React from 'react';
import { List } from '@mui/material';
import ProductItem from './ProductItem';

type Product = {
    id: number;
    name: string;
    price: number;
    price_per_unit: number | null;
    created_at: string;
    market: string;
    image_url: string | null;
    ean: string;
    url: string | null;
    quantity?: number;
};

type ProductListProps = {
    products: Product[];
};

const ProductList: React.FC<ProductListProps> = ({ products }) => {
    return (
        <List>
            {products.map(product => (
                <ProductItem key={product.id} product={product} />
            ))}
        </List>
    );
};

export default ProductList;
