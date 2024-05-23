import { useState } from "react";
import { Box, Button } from "@mui/material";
import styles from "@/styles/Home.module.css";

interface Product {
  id: number;
  name: string;
  price: number;
  price_per_unit: number;
}

const URI = 'http://localhost:8000/products'; /**Move to a better place */

export default function Home() {
  const [error, setError] = useState<string | null>(null);
  const [products, setProducts] = useState<Product[]>([]);

  const handleClick = () => {
    fetch(URI)
      .then(response => response.json())
      .then(data => {
        const productsArray = data as Product[];
        console.log(productsArray);
        setProducts([...products, ...productsArray]);
      })
      .catch(error => {
      setError(error.message);
      });
  }

  return (
    <>
      <Box className={styles.main}>
        <p>Hello World!</p>
        <Button
          variant='contained'
          onClick={handleClick}
          color='primary'>
          Click me!
        </Button>
        <Box>
          {error && <p>{error}</p>}
          <ul>
            {products.map(product => (
              <li key={product.id}>
                {product.name} - ${product.price} - ${product.price_per_unit}
              </li>
            ))}
          </ul>
        </Box>
      </Box>
    </>
  );
}
