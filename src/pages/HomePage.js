import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Grid,
  Button,
  Card,
  CardContent,
  CardMedia,
  Divider,
  useTheme,
  useMediaQuery,
  Paper,
  Snackbar,
  Alert
} from '@mui/material';
import Hero from '../components/Hero';
import ProductCard from '../components/ProductCard';
import products from '../data/products';
import { useCart } from '../context/CartContext';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import VerifiedIcon from '@mui/icons-material/Verified';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import DiscountIcon from '@mui/icons-material/Discount';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';


function HomePage() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [addedProduct, setAddedProduct] = useState('');

  // Featured products (showing first 4)
  const featuredProducts = products.slice(0, 4);
  
  // Quick add products (best sellers)
  const quickAddProducts = [
    products[0], // Premium Full Cream Milk
    products[3], // Bulk Mozzarella Cheese
    products[5], // Whipping Cream
  ];

  const handleQuickAddToCart = (product) => {
    addToCart(product);
    setAddedProduct(product.name);
    setSnackbarOpen(true);
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  // Categories with images
  const categories = [
    {
      name: 'Milk',
      image: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?q=80&w=1000&auto=format&fit=crop',
      description: 'Premium quality milk varieties for cafes, restaurants, and food services.'
    },
    {
      name: 'Cheese',
      image: 'https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?q=80&w=1000&auto=format&fit=crop',
      description: 'Artisanal and bulk cheese options for restaurants and food manufacturers.'
    },
    {
      name: 'Yogurt',
      image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?q=80&w=1000&auto=format&fit=crop',
      description: 'Creamy yogurt products for hotels, breakfast services, and health food businesses.'
    },
    {
      name: 'Butter & Cream',
      image: 'https://images.unsplash.com/photo-1589985270958-bed1abed93f9?q=80&w=1000&auto=format&fit=crop',
      description: 'High-quality butter and cream for bakeries, patisseries, and food production.'
    }
  ];

  // Service benefits
  const benefits = [
    {
      icon: <LocalShippingIcon fontSize="large" color="primary" />,
      title: 'Fast Delivery',
      description: 'Next-day delivery for all orders placed before 2 PM. Temperature-controlled vehicles to ensure product freshness.'
    },
    {
      icon: <VerifiedIcon fontSize="large" color="primary" />,
      title: 'Quality Guaranteed',
      description: 'All products sourced from our own farms and trusted partners. Rigorous quality control at every step.'
    },
    {
      icon: <SupportAgentIcon fontSize="large" color="primary" />,
      title: 'Dedicated Support',
      description: 'Personal account manager for all B2B clients. 24/7 customer service for urgent requirements.'
    },
    {
      icon: <DiscountIcon fontSize="large" color="primary" />,
      title: 'Wholesale Pricing',
      description: 'Competitive bulk pricing and volume discounts. Flexible payment terms for regular clients.'
    }
  ];

  return (
    <Box>
      {/* Hero Section */}
      <Hero />

      {/* Quick Add Section */}
      <Container maxWidth="lg" sx={{ py: { xs: 3, md: 5 } }}>
        <Box sx={{ mb: 4, textAlign: 'center' }}>
          <Typography variant="h3" component="h2" gutterBottom sx={{ fontWeight: 600 }}>
            Quick Add to Cart
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 700, mx: 'auto' }}>
            Most popular products for instant ordering
          </Typography>
        </Box>

        <Paper 
          elevation={3} 
          sx={{
            p: 3,
            mb: 5,
            borderRadius: 2,
            bgcolor: 'primary.light',
            color: 'white'
          }}
        >
          <Grid container spacing={3}>
            {quickAddProducts.map((product) => (
              <Grid item key={product.id} xs={12} md={4}>
                <Card 
                  sx={{ 
                    display: 'flex',
                    alignItems: 'center',
                    boxShadow: 3,
                    '&:hover': { boxShadow: 6 },
                    transition: 'transform 0.2s',
                    bgcolor: 'background.paper',
                    color: 'text.primary'
                  }}
                >
                  <CardMedia
                    component="img"
                    sx={{ width: 100, height: 100, objectFit: 'cover' }}
                    image={product.imageUrl || 'https://via.placeholder.com/100x100?text=Product'}
                    alt={product.name}
                  />
                  <CardContent sx={{ flex: '1 0 auto', py: 2 }}>
                    <Typography component="div" variant="h6" sx={{ fontWeight: 600 }}>
                      {product.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                      ${product.price} {product.unit}
                    </Typography>
                    <Button
                      variant="contained"
                      color="primary"
                      size="small"
                      startIcon={<ShoppingCartIcon />}
                      onClick={() => handleQuickAddToCart(product)}
                      sx={{ borderRadius: 2 }}
                    >
                      Quick Add
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Paper>
      </Container>

      {/* Featured Products Section */}
      <Container maxWidth="lg" sx={{ py: { xs: 5, md: 8 } }}>
        <Box sx={{ mb: 5, textAlign: 'center' }}>
          <Typography variant="h3" component="h2" gutterBottom sx={{ fontWeight: 600 }}>
            Featured Products
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 700, mx: 'auto' }}>
            Our most popular dairy products for business customers
          </Typography>
        </Box>

        <Grid container spacing={3}>
          {featuredProducts.map((product) => (
            <Grid item key={product.id} xs={12} sm={6} md={3}>
              <ProductCard product={product} />
            </Grid>
          ))}
        </Grid>

        <Box sx={{ textAlign: 'center', mt: 5 }}>
          <Button 
            variant="outlined" 
            color="primary" 
            size="large"
            onClick={() => navigate('/products')}
            sx={{ borderRadius: 2, py: 1, px: 4 }}
          >
            View All Products
          </Button>
        </Box>
      </Container>

      <Divider />

      {/* Categories Section */}
      <Box sx={{ bgcolor: '#f8f9fa', py: { xs: 5, md: 8 } }}>
        <Container maxWidth="lg">
          <Box sx={{ mb: 5, textAlign: 'center' }}>
            <Typography variant="h3" component="h2" gutterBottom sx={{ fontWeight: 600 }}>
              Product Categories
            </Typography>
            <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 700, mx: 'auto' }}>
              Explore our wide range of dairy products
            </Typography>
          </Box>

          <Grid container spacing={3}>
            {categories.map((category) => (
              <Grid item key={category.name} xs={12} sm={6} md={3}>
                <Card 
                  sx={{ 
                    height: '100%', 
                    display: 'flex', 
                    flexDirection: 'column',
                    transition: 'transform 0.3s',
                    '&:hover': {
                      transform: 'scale(1.03)',
                    }
                  }}
                >
                  <CardMedia
                    component="img"
                    height="160"
                    image={category.image}
                    alt={category.name}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="div" sx={{ fontWeight: 600 }}>
                      {category.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {category.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Benefits Section */}
      <Container maxWidth="lg" sx={{ py: { xs: 5, md: 8 } }}>
        <Box sx={{ mb: 5, textAlign: 'center' }}>
          <Typography variant="h3" component="h2" gutterBottom sx={{ fontWeight: 600 }}>
            Why Choose Us
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 700, mx: 'auto' }}>
            We provide the best service for our B2B customers
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {benefits.map((benefit, index) => (
            <Grid item key={index} xs={12} sm={6} md={3}>
              <Box sx={{ textAlign: 'center', height: '100%' }}>
                <Box sx={{ mb: 2 }}>
                  {benefit.icon}
                </Box>
                <Typography variant="h5" component="h3" gutterBottom sx={{ fontWeight: 600 }}>
                  {benefit.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {benefit.description}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* CTA Section */}
      <Box sx={{ bgcolor: 'primary.main', color: 'white', py: { xs: 5, md: 8 } }}>
        <Container maxWidth="md">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={8} sx={{ textAlign: { xs: 'center', md: 'left' } }}>
              <Typography variant="h3" component="h2" gutterBottom sx={{ fontWeight: 600 }}>
                Ready to Order?
              </Typography>
              <Typography variant="h6" sx={{ opacity: 0.8, fontWeight: 'normal' }}>
                Contact our sales team for personalized quotes and business accounts.
              </Typography>
            </Grid>
            <Grid item xs={12} md={4} sx={{ textAlign: { xs: 'center', md: 'right' } }}>
              <Button 
                variant="contained" 
                color="secondary" 
                size="large"
                onClick={() => navigate('/contact')}
                sx={{ 
                  borderRadius: 2, 
                  py: 1.5, 
                  px: 4, 
                  color: 'white', 
                  fontWeight: 600,
                  boxShadow: '0 4px 14px 0 rgba(0,0,0,0.2)'
                }}
              >
                Contact Sales
              </Button>
            </Grid>
          </Grid>
        </Container>
      </Box>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
          {addedProduct} added to cart!
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default HomePage; 