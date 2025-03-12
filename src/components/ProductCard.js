import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Chip,
  Button,
  Rating,
  Snackbar,
  Alert
} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useCart } from '../context/CartContext';

// Default placeholder image for products without images
const placeholderImage = 'https://via.placeholder.com/300x200?text=Dairy+Product';

function ProductCard({ product }) {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);
  
  // Destructure product properties with fallbacks for safety
  const { 
    id, 
    name, 
    description, 
    price, 
    unit, 
    category, 
    stock,
    imageUrl = placeholderImage
  } = product;
  
  const handleClick = () => {
    navigate(`/products/${id}`);
  };

  const handleAddToCart = (e) => {
    e.stopPropagation(); // Prevent card click when clicking on the button
    addToCart(product);
    setSnackbarOpen(true);
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  const getStockStatus = () => {
    if (stock > 100) return { text: 'In Stock', color: 'success' };
    if (stock > 0) return { text: 'Low Stock', color: 'warning' };
    return { text: 'Out of Stock', color: 'error' };
  };

  const stockStatus = getStockStatus();

  return (
    <>
      <Card 
        elevation={2}
        sx={{ 
          height: '100%', 
          display: 'flex', 
          flexDirection: 'column',
          transition: 'transform 0.2s, box-shadow 0.2s',
          '&:hover': {
            transform: 'translateY(-5px)',
            boxShadow: 6
          }
        }}
      >
        <CardActionArea onClick={handleClick} sx={{ flexGrow: 1 }}>
          <CardMedia
            component="img"
            height="180"
            image={imageUrl}
            alt={name}
            sx={{ objectFit: 'cover' }}
          />
          <CardContent sx={{ flexGrow: 1, pt: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
              <Typography variant="h6" component="div" gutterBottom sx={{ fontWeight: 600 }}>
                {name}
              </Typography>
              <Chip
                size="small"
                label={category}
                color="primary"
                variant="outlined"
                sx={{ ml: 1 }}
              />
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <Rating value={4.5} precision={0.5} size="small" readOnly />
              <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                4.5
              </Typography>
            </Box>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2, minHeight: 60 }}>
              {description.length > 120 ? `${description.substring(0, 120)}...` : description}
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="h6" color="primary.main">
                ${price}
                <Typography variant="body2" component="span" color="text.secondary" sx={{ ml: 0.5 }}>
                  {unit}
                </Typography>
              </Typography>
              <Chip 
                size="small" 
                label={stockStatus.text} 
                color={stockStatus.color} 
                variant="outlined"
              />
            </Box>
          </CardContent>
        </CardActionArea>
        <Box sx={{ p: 2, pt: 0 }}>
          <Button 
            variant="contained" 
            fullWidth 
            startIcon={<ShoppingCartIcon />}
            disabled={stock === 0}
            sx={{ borderRadius: 2 }}
            onClick={handleAddToCart}
          >
            Add to Cart
          </Button>
        </Box>
      </Card>
      <Snackbar open={snackbarOpen} autoHideDuration={3000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
          {name} added to cart!
        </Alert>
      </Snackbar>
    </>
  );
}

export default ProductCard; 