import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Grid,
  Typography,
  Button,
  Chip,
  Divider,
  Card,
  CardContent,
  TextField,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Rating,
  Breadcrumbs,
  Link,
  IconButton,
  Alert,
  useMediaQuery,
  useTheme
} from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import VerifiedIcon from '@mui/icons-material/Verified';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import products from '../data/products';
import { useCart } from '../context/CartContext';

// Placeholder image for products without images
const placeholderImage = 'https://via.placeholder.com/600x400?text=Dairy+Product';

function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { addToCart } = useCart();
  // Find the product with the matching ID (handle both string and number IDs)
  const product = products.find(p => p.id === id || p.id === parseInt(id));
  
  // State for quantity
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);

  useEffect(() => {
    if (product?.minOrder) {
      setQuantity(product.minOrder);
    }
  }, [product]);

  // Handle quantity change
  const handleQuantityChange = (event) => {
    const value = parseInt(event.target.value);
    if (!isNaN(value) && value >= product.minOrder) {
      setQuantity(value);
    }
  };

  // Increment quantity
  const incrementQuantity = () => {
    setQuantity(prev => prev + 1);
  };

  // Decrement quantity
  const decrementQuantity = () => {
    if (quantity > product.minOrder) {
      setQuantity(prev => prev - 1);
    }
  };

  // Handle add to cart
  const handleAddToCart = (e) => {
    e.stopPropagation(); // Prevent card click when clicking on the button
    const productWithQuantity = {
      ...product,
      quantity: quantity // Add the selected quantity to the product
    };
    addToCart(productWithQuantity);
    setAddedToCart(true);
    setTimeout(() => {
      setAddedToCart(false);
    }, 3000);
  };

  // If product doesn't exist, show not found message
  if (!product) {
    return (
      <Container maxWidth="lg" sx={{ py: 8, textAlign: 'center' }}>
        <Typography variant="h4" gutterBottom>
          Product Not Found
        </Typography>
        <Typography variant="body1" paragraph>
          The product you're looking for doesn't exist or has been removed.
        </Typography>
        <Button 
          variant="contained" 
          onClick={() => navigate('/products')}
          startIcon={<ArrowBackIcon />}
        >
          Back to Products
        </Button>
      </Container>
    );
  }

  // Related products (products in the same category)
  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <Box sx={{ py: 4 }}>
      <Container maxWidth="lg">
        {/* Breadcrumbs */}
        <Breadcrumbs 
          separator={<NavigateNextIcon fontSize="small" />} 
          aria-label="breadcrumb"
          sx={{ mb: 3 }}
        >
          <Link 
            color="inherit" 
            href="/" 
            onClick={(e) => { e.preventDefault(); navigate('/'); }}
          >
            Home
          </Link>
          <Link 
            color="inherit" 
            href="/products" 
            onClick={(e) => { e.preventDefault(); navigate('/products'); }}
          >
            Products
          </Link>
          <Link 
            color="inherit" 
            href={`/products?category=${product.category.toLowerCase()}`} 
            onClick={(e) => { e.preventDefault(); navigate(`/products?category=${product.category.toLowerCase()}`); }}
          >
            {product.category}
          </Link>
          <Typography color="text.primary">{product.name}</Typography>
        </Breadcrumbs>

        {/* Back Button - Mobile Only */}
        {isMobile && (
          <Button 
            variant="outlined" 
            startIcon={<ArrowBackIcon />} 
            onClick={() => navigate(-1)}
            sx={{ mb: 2 }}
          >
            Back
          </Button>
        )}

        {/* Product Details */}
        <Grid container spacing={4}>
          {/* Product Image */}
          <Grid item xs={12} md={6}>
            <Box
              component="img"
              src={product.imageUrl || placeholderImage}
              alt={product.name}
              sx={{
                width: '100%',
                borderRadius: 2,
                boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                mb: 2
              }}
            />
          </Grid>

          {/* Product Info */}
          <Grid item xs={12} md={6}>
            <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <Box sx={{ mb: 1 }}>
                <Chip 
                  label={product.category} 
                  color="primary" 
                  variant="outlined" 
                  size="small" 
                />
              </Box>
              <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 700 }}>
                {product.name}
              </Typography>
              
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Rating value={4.5} precision={0.5} readOnly />
                <Typography variant="body2" sx={{ ml: 1 }}>
                  4.5 (24 reviews)
                </Typography>
              </Box>

              <Typography variant="h4" color="primary.main" gutterBottom>
                ${product.price.toFixed(2)} 
                <Typography variant="body1" component="span" color="text.secondary" sx={{ ml: 1 }}>
                  {product.unit}
                </Typography>
              </Typography>

              <Typography variant="body1" paragraph sx={{ my: 2 }}>
                {product.description}
              </Typography>

              {/* Features */}
              <Typography variant="h6" gutterBottom sx={{ mt: 2, fontWeight: 600 }}>
                Key Features
              </Typography>
              <List dense disablePadding>
                {product.features.map((feature, index) => (
                  <ListItem key={index} disableGutters sx={{ py: 0.5 }}>
                    <ListItemIcon sx={{ minWidth: 30 }}>
                      <CheckCircleOutlineIcon color="primary" fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary={feature} />
                  </ListItem>
                ))}
              </List>

              <Divider sx={{ my: 3 }} />

              {/* Add to Cart Section */}
              <Box sx={{ mt: 'auto' }}>
                <Grid container spacing={2} alignItems="center">
                  <Grid item xs={12}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <Typography variant="body1" sx={{ mr: 2 }}>
                        Quantity:
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <IconButton 
                          size="small" 
                          onClick={decrementQuantity}
                          disabled={quantity <= product.minOrder}
                        >
                          <RemoveIcon fontSize="small" />
                        </IconButton>
                        <TextField
                          value={quantity}
                          onChange={handleQuantityChange}
                          inputProps={{ 
                            min: product.minOrder,
                            style: { textAlign: 'center' }
                          }}
                          variant="outlined"
                          size="small"
                          sx={{ width: 70, mx: 1 }}
                        />
                        <IconButton size="small" onClick={incrementQuantity}>
                          <AddIcon fontSize="small" />
                        </IconButton>
                      </Box>
                    </Box>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      Minimum order: {product.minOrder} {product.minOrder > 1 ? 'units' : 'unit'}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      variant="contained"
                      color="primary"
                      size="large"
                      fullWidth
                      startIcon={<ShoppingCartIcon />}
                      onClick={handleAddToCart}
                      sx={{ py: 1.5, borderRadius: 2 }}
                    >
                      Add to Cart
                    </Button>
                  </Grid>
                </Grid>

                {addedToCart && (
                  <Alert severity="success" sx={{ mt: 2 }}>
                    {product.name} added to cart successfully!
                  </Alert>
                )}

                {/* Shipping & Quality Notes */}
                <Box sx={{ mt: 3 }}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <LocalShippingIcon color="action" sx={{ mr: 1 }} />
                        <Typography variant="body2" color="text.secondary">
                          Fast Delivery Available
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <VerifiedIcon color="action" sx={{ mr: 1 }} />
                        <Typography variant="body2" color="text.secondary">
                          Quality Guaranteed
                        </Typography>
                      </Box>
                    </Grid>
                  </Grid>
                </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ my: 6 }} />

        {/* Additional Information */}
        <Grid container spacing={4}>
          <Grid item xs={12} md={8}>
            <Typography variant="h4" gutterBottom sx={{ fontWeight: 600 }}>
              Product Details
            </Typography>
            <Typography variant="body1" paragraph>
              Our {product.name} is sourced from our own farms where the cows are raised in the best conditions.
              We focus on sustainable and ethical farming practices to ensure that our products are of the highest quality.
            </Typography>
            <Typography variant="body1" paragraph>
              This product is ideal for {product.category === 'Milk' ? 'cafes, restaurants, and food services' : 
                product.category === 'Cheese' ? 'pizzerias, restaurants, and catering services' : 
                product.category === 'Yogurt' ? 'hotels, breakfast services, and health food businesses' : 
                product.category === 'Butter' ? 'bakeries and food manufacturers' : 
                'various food service businesses'}.
            </Typography>
            <Typography variant="body1" paragraph>
              For bulk orders or special requirements, please contact our sales team directly.
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card variant="outlined" sx={{ mb: 3 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Bulk Order Inquiry
                </Typography>
                <Typography variant="body2" paragraph>
                  Need larger quantities or custom packaging?
                </Typography>
                <Button
                  variant="outlined"
                  color="primary"
                  fullWidth
                  onClick={() => navigate('/contact')}
                >
                  Contact Sales
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <Box sx={{ mt: 6 }}>
            <Typography variant="h4" gutterBottom sx={{ fontWeight: 600 }}>
              Related Products
            </Typography>
            <Grid container spacing={3}>
              {relatedProducts.map(relatedProduct => (
                <Grid item key={relatedProduct.id} xs={12} sm={6} md={3}>
                  <Card 
                    elevation={0}
                    sx={{ 
                      height: '100%', 
                      display: 'flex', 
                      flexDirection: 'column',
                      transition: 'transform 0.3s',
                      cursor: 'pointer',
                      '&:hover': {
                        transform: 'translateY(-8px)',
                      },
                      border: '1px solid',
                      borderColor: 'divider'
                    }}
                    onClick={() => {
                      navigate(`/products/${relatedProduct.id}`);
                      window.scrollTo(0, 0);
                    }}
                  >
                    <Box
                      component="img"
                      src={relatedProduct.imageUrl || placeholderImage}
                      alt={relatedProduct.name}
                      sx={{ 
                        width: '100%',
                        height: 200,
                        objectFit: 'cover',
                      }}
                    />
                    <CardContent>
                      <Typography variant="h6" component="div">
                        {relatedProduct.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                        {relatedProduct.description.substring(0, 60)}...
                      </Typography>
                      <Typography variant="h6" color="primary.main">
                        ${relatedProduct.price.toFixed(2)}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        )}
      </Container>
    </Box>
  );
}

export default ProductDetailPage; 