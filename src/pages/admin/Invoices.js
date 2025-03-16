import React, { useState } from 'react';
import {
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  IconButton,
  Button,
  Menu,
  MenuItem
} from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import VisibilityIcon from '@mui/icons-material/Visibility';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import FilterListIcon from '@mui/icons-material/FilterList';

function Invoices() {
  const [searchTerm, setSearchTerm] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedInvoice, setSelectedInvoice] = useState(null);

  // Sample invoices data - replace with actual data from your backend
  const invoices = [
    {
      id: 'INV-2024-001',
      customer: 'John Doe',
      date: '2024-03-12',
      amount: '₹240',
      status: 'Paid',
      dueDate: '2024-03-26'
    },
    {
      id: 'INV-2024-002',
      customer: 'Jane Smith',
      date: '2024-03-12',
      amount: '₹180',
      status: 'Pending',
      dueDate: '2024-03-26'
    },
    {
      id: 'INV-2024-003',
      customer: 'Mike Johnson',
      date: '2024-03-11',
      amount: '₹120',
      status: 'Overdue',
      dueDate: '2024-03-18'
    },
    // Add more invoices as needed
  ];

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleMenuClick = (event, invoice) => {
    setAnchorEl(event.currentTarget);
    setSelectedInvoice(invoice);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedInvoice(null);
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'paid':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'overdue':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredInvoices = invoices.filter(invoice =>
    invoice.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
    invoice.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Invoices</h1>
        <Button
          variant="contained"
          color="primary"
          startIcon={<FilterListIcon />}
          className="bg-primary-600"
        >
          Filter
        </Button>
      </div>

      <Card className="mb-6">
        <div className="p-4">
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Search invoices by ID or customer name..."
            value={searchTerm}
            onChange={handleSearch}
            size="small"
          />
        </div>

        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Invoice ID</TableCell>
              <TableCell>Customer</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Due Date</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredInvoices.map((invoice) => (
              <TableRow key={invoice.id}>
                <TableCell>{invoice.id}</TableCell>
                <TableCell>{invoice.customer}</TableCell>
                <TableCell>{invoice.date}</TableCell>
                <TableCell>{invoice.dueDate}</TableCell>
                <TableCell>{invoice.amount}</TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(invoice.status)}`}>
                    {invoice.status}
                  </span>
                </TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <IconButton size="small">
                      <VisibilityIcon fontSize="small" />
                    </IconButton>
                    <IconButton size="small">
                      <DownloadIcon fontSize="small" />
                    </IconButton>
                    <IconButton
                      size="small"
                      onClick={(e) => handleMenuClick(e, invoice)}
                    >
                      <MoreVertIcon fontSize="small" />
                    </IconButton>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleMenuClose}>Send Reminder</MenuItem>
        <MenuItem onClick={handleMenuClose}>Mark as Paid</MenuItem>
        <MenuItem onClick={handleMenuClose}>Print Invoice</MenuItem>
      </Menu>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-4">
          <h3 className="text-sm text-gray-500">Total Invoices</h3>
          <p className="text-2xl font-semibold mt-1">₹54,000</p>
          <p className="text-xs text-green-600 mt-2">+8.2% from last month</p>
        </Card>
        <Card className="p-4">
          <h3 className="text-sm text-gray-500">Paid</h3>
          <p className="text-2xl font-semibold mt-1">₹32,000</p>
          <p className="text-xs text-green-600 mt-2">15 invoices</p>
        </Card>
        <Card className="p-4">
          <h3 className="text-sm text-gray-500">Pending</h3>
          <p className="text-2xl font-semibold mt-1">₹15,000</p>
          <p className="text-xs text-yellow-600 mt-2">8 invoices</p>
        </Card>
        <Card className="p-4">
          <h3 className="text-sm text-gray-500">Overdue</h3>
          <p className="text-2xl font-semibold mt-1">₹7,000</p>
          <p className="text-xs text-red-600 mt-2">3 invoices</p>
        </Card>
      </div>
    </div>
  );
}

export default Invoices; 