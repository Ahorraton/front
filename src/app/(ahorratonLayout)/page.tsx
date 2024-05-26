"use client"
import { useState } from "react";
import { Box, Button, Typography, Grid, IconButton, TextField } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import PageContainer from '@/app/(ahorratonLayout)/components/container/PageContainer';

interface Product {
  id: number;
  name: string;
  price: number;
  price_per_unit: number;
  image: string;
  description: string;
}

const URI = 'http://localhost:8000/products'; /**Move to a better place */

const SearchBar = ({setSearchQuery}) => (
  <form>
    <TextField
      id="search-bar"
      className="text"
      onInput={(e) => {
        setSearchQuery(e.target.value);
      }}
      label="Enter a city name"
      variant="outlined"
      placeholder="Search..."
      size="small"
    />
    <IconButton type="submit" aria-label="search">
      <SearchIcon style={{ fill: "blue" }} />
    </IconButton>
  </form>
);


export default function Home() {
  const [error, setError] = useState<string | null>(null);
  const [products, setProducts] = useState<Product[]>([]);

  // Manually added products
  const initialProducts: Product[] = [
    {
      id: 1,
      name: "Dani",
      price: 10,
      price_per_unit: 5,
      image: "https://i5.walmartimages.com/asr/e9ff8590-58ad-44f4-8a74-99aff8a72ea9.1bb69167e16a3d0209eb310e758fcb36.jpeg",
      description: "Description of Product 1",
    },
    {
      id: 2,
      name: "Ale",
      price: 15,
      price_per_unit: 7,
      image: "https://i5.walmartimages.com/asr/e9ff8590-58ad-44f4-8a74-99aff8a72ea9.1bb69167e16a3d0209eb310e758fcb36.jpeg",
      description: "Description of Product 2",
    },
    {
      id: 3,
      name: "Ivan",
      price: 15,
      price_per_unit: 7,
      image: "https://i5.walmartimages.com/asr/e9ff8590-58ad-44f4-8a74-99aff8a72ea9.1bb69167e16a3d0209eb310e758fcb36.jpeg",
      description: "Description of Product 3",
    },
    {
      id: 4,
      name: "Luis",
      price: 150,
      price_per_unit: 7,
      image: "https://i5.walmartimages.com/asr/e9ff8590-58ad-44f4-8a74-99aff8a72ea9.1bb69167e16a3d0209eb310e758fcb36.jpeg",
      description: "Description of Product 4",
    }
  ];

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

  const [searchQuery, setSearchQuery] = useState("");

  return (
    <PageContainer title="Ahorraton" description="Ahorra en grande">
      <Box alignContent={"center"} alignItems={"center"}>
        <Typography variant="h1" align="center" gutterBottom>
          Buscar 
        </Typography>

      
        <SearchBar setSearchQuery={setSearchQuery} />

        
        <Button
          variant='contained'
          onClick={handleClick}
          color='primary'>
          Click me!
        </Button>
        <Box>
          {error && <p>{error}</p>}

          {searchQuery &&
          <Grid container spacing={2}>
            {[...initialProducts, ...products].map(product => (
              <Grid item key={product.id} xs={12} sm={10} md={4} lg={3}>
                <Card sx={{ maxWidth: 350, width: '100%', margin: 'auto' }}>
                  <CardMedia
                    component="img"
                    alt={product.name}
                    height="200%"
                    width="100%"
                    image={product.image}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {product.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {product.description}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small">Agregar a carrito</Button>
                    <Button size="small">Ver más</Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
          }
        </Box>
      </Box>
      </PageContainer>
  );
}