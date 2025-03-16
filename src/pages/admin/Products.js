import React, { useState } from 'react';
import { 
  Card, 
  Button, 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableRow,
  TextField,
  IconButton
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';

function Products() {
  const [searchTerm, setSearchTerm] = useState('');

  // Sample product data - replace with actual data from your backend
  const products = [
    {
      id: 1,
      name: 'Full Cream Milk',
      category: 'Milk',
      price: '₹60',
      stock: 100,
      status: 'In Stock'
    },
    {
      id: 2,
      name: 'Toned Milk',
      category: 'Milk',
      price: '₹45',
      stock: 150,
      status: 'In Stock'
    },
    {
      id: 3,
      name: 'Double Toned Milk',
      category: 'Milk',
      price: '₹40',
      stock: 80,
      status: 'Low Stock'
    },
    // Add more products as needed
  ];

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Products</h1>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          className="bg-primary-600"
        >
          Add Product
        </Button>
      </div>

      <Card className="mb-6">
        <div className="p-4">
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Search products..."
            value={searchTerm}
            onChange={handleSearch}
            size="small"
          />
        </div>

        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Product Name</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Stock</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredProducts.map((product) => (
              <TableRow key={product.id}>
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.category}</TableCell>
                <TableCell>{product.price}</TableCell>
                <TableCell>{product.stock}</TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    product.status === 'In Stock' 
                      ? 'bg-green-100 text-green-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {product.status}
                  </span>
                </TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <IconButton size="small" color="primary">
                      <EditIcon fontSize="small" />
                    </IconButton>
                    <IconButton size="small" color="error">
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}

export default Products; 