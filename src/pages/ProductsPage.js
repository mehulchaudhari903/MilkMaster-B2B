import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  TextField,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Pagination,
  Divider,
  useMediaQuery,
  useTheme
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import ProductCard from '../components/ProductCard';
import products from '../data/products';

function ProductsPage() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [searchParams, setSearchParams] = useSearchParams();
  
  // Get category from URL params if present
  const categoryParam = searchParams.get('category');
  
  // States
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState(categoryParam || 'all');
  const [sortBy, setSortBy] = useState('name');
  const [page, setPage] = useState(1);
  const productsPerPage = 8;

  // Extract unique categories from products
  const categories = ['all', ...new Set(products.map(product => product.category))];

  // Filter and sort products based on search, category, and sort
  useEffect(() => {
    let result = [...products];
    
    // Filter by search term
    if (searchTerm) {
      result = result.filter(product => 
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Filter by category
    if (category && category !== 'all') {
      result = result.filter(product => 
        product.category.toLowerCase() === category.toLowerCase()
      );
    }
    
    // Sort products
    result.sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      return 0;
    });
    
    setFilteredProducts(result);
    setPage(1); // Reset to first page when filters change
  }, [searchTerm, category, sortBy]);

  // Update URL when category changes
  useEffect(() => {
    if (category && category !== 'all') {
      setSearchParams({ category: category.toLowerCase() });
    } else {
      setSearchParams({});
    }
  }, [category, setSearchParams]);

  // Pagination
  const pageCount = Math.ceil(filteredProducts.length / productsPerPage);
  const displayedProducts = filteredProducts.slice(
    (page - 1) * productsPerPage,
    page * productsPerPage
  );

  const handlePageChange = (event, value) => {
    setPage(value);
    window.scrollTo(0, 0);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const handleSortChange = (event) => {
    setSortBy(event.target.value);
  };

  const handleClearFilters = () => {
    setSearchTerm('');
    setCategory('all');
    setSortBy('name');
    setSearchParams({});
  };

  return (
    <Box sx={{ py: 4 }}>
      <Container maxWidth="xl">
        {/* Page Header */}
        <Box sx={{ mb: 4, textAlign: 'center' }}>
          <Typography variant="h3" component="h1" sx={{ fontWeight: 700, mb: 1 }}>
            Our Products
          </Typography>
          <Typography variant="h6" color="text.secondary">
            Browse our catalog of premium dairy products for your business
          </Typography>
        </Box>

        {/* Filter and Search Section */}
        <Card sx={{ mb: 4, p: 3, borderRadius: 2 }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                variant="outlined"
                placeholder="Search products..."
                value={searchTerm}
                onChange={handleSearchChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <FormControl fullWidth variant="outlined">
                <InputLabel id="category-label">Category</InputLabel>
                <Select
                  labelId="category-label"
                  id="category-select"
                  value={category}
                  onChange={handleCategoryChange}
                  label="Category"
                >
                  {categories.map((cat) => (
                    <MenuItem key={cat} value={cat}>
                      {cat.charAt(0).toUpperCase() + cat.slice(1)}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <FormControl fullWidth variant="outlined">
                <InputLabel id="sort-label">Sort By</InputLabel>
                <Select
                  labelId="sort-label"
                  id="sort-select"
                  value={sortBy}
                  onChange={handleSortChange}
                  label="Sort By"
                >
                  <MenuItem value="name">Name (A-Z)</MenuItem>
                  <MenuItem value="price-low">Price (Low to High)</MenuItem>
                  <MenuItem value="price-high">Price (High to Low)</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={2} sx={{ display: 'flex', justifyContent: { xs: 'flex-start', md: 'flex-end' } }}>
              <Chip
                label="Clear Filters"
                onClick={handleClearFilters}
                color="primary"
                variant="outlined"
                icon={<FilterListIcon />}
                sx={{ height: 40 }}
              />
            </Grid>
          </Grid>
        </Card>

        {/* Results Summary */}
        <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap' }}>
          <Typography variant="body1" color="text.secondary">
            Showing {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''}
            {category !== 'all' && <span> in <strong>{category}</strong></span>}
          </Typography>
          {!isMobile && pageCount > 1 && (
            <Pagination 
              count={pageCount} 
              page={page} 
              onChange={handlePageChange}
              color="primary" 
              shape="rounded"
            />
          )}
        </Box>

        {/* Product Grid */}
        {filteredProducts.length > 0 ? (
          <Grid container spacing={3}>
            {displayedProducts.map((product) => (
              <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
                <ProductCard product={product} />
              </Grid>
            ))}
          </Grid>
        ) : (
          <Box sx={{ py: 10, textAlign: 'center' }}>
            <Typography variant="h5" gutterBottom>
              No products found
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Try adjusting your search or filter criteria
            </Typography>
          </Box>
        )}

        {/* Mobile Pagination - bottom */}
        {isMobile && pageCount > 1 && (
          <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
            <Pagination 
              count={pageCount} 
              page={page} 
              onChange={handlePageChange}
              color="primary" 
              shape="rounded"
            />
          </Box>
        )}

        {/* Additional Info */}
        <Divider sx={{ my: 6 }} />
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" gutterBottom sx={{ fontWeight: 600 }}>
            Bulk Ordering
          </Typography>
          <Typography variant="body1" paragraph>
            All products are available for bulk ordering. Contact our sales team for custom quotes and wholesale prices.
          </Typography>
          <Typography variant="h4" gutterBottom sx={{ fontWeight: 600, mt: 4 }}>
            Quality Guarantee
          </Typography>
          <Typography variant="body1" paragraph>
            We stand behind the quality of our products. All dairy products are sourced from our own farms and trusted partners, 
            ensuring the highest standards of quality and freshness.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}

export default ProductsPage; 