import React, { useState } from 'react';
import {
  Card,
  TextField,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SearchIcon from '@mui/icons-material/Search';
import HelpIcon from '@mui/icons-material/Help';
import ContactSupportIcon from '@mui/icons-material/ContactSupport';
import ArticleIcon from '@mui/icons-material/Article';

function Help() {
  const [searchTerm, setSearchTerm] = useState('');

  // Sample FAQ data
  const faqs = [
    {
      question: 'How do I add a new product?',
      answer: 'To add a new product, go to the Products page and click on the "Add Product" button. Fill in the required details such as name, price, and stock quantity, then click Save.'
    },
    {
      question: 'How do I process orders?',
      answer: 'Orders can be processed from the Orders page. Click on an order to view its details, then use the action buttons to update its status, generate invoice, or mark it as complete.'
    },
    {
      question: 'How do I generate reports?',
      answer: 'Navigate to the Reports page where you can find various report types including sales, inventory, and customer analytics. Select the desired report type and date range, then click Generate.'
    },
    {
      question: 'How do I manage user accounts?',
      answer: 'User accounts can be managed from the Users page. You can add new users, edit existing ones, or change their roles and permissions from this section.'
    }
  ];

  // Sample documentation sections
  const documentation = [
    {
      title: 'Getting Started',
      icon: <ArticleIcon />,
      description: 'Learn the basics of using the admin panel'
    },
    {
      title: 'User Management',
      icon: <ArticleIcon />,
      description: 'Detailed guide on managing users and permissions'
    },
    {
      title: 'Order Processing',
      icon: <ArticleIcon />,
      description: 'Complete guide to processing and managing orders'
    },
    {
      title: 'Reports & Analytics',
      icon: <ArticleIcon />,
      description: 'Understanding different reports and analytics'
    }
  ];

  const filteredFaqs = faqs.filter(faq =>
    faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Help Center</h1>
      </div>

      {/* Search Section */}
      <Card className="mb-8 p-6">
        <div className="text-center mb-6">
          <HelpIcon className="text-6xl text-primary-600 mb-4" />
          <h2 className="text-2xl font-semibold mb-2">How can we help you?</h2>
          <p className="text-gray-500">Search our help center or browse the categories below</p>
        </div>
        <div className="max-w-2xl mx-auto">
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Search for help..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: <SearchIcon className="text-gray-400 mr-2" />
            }}
          />
        </div>
      </Card>

      {/* Quick Links */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="p-6 text-center">
          <ArticleIcon className="text-4xl text-primary-600 mb-3" />
          <h3 className="text-lg font-semibold mb-2">Documentation</h3>
          <p className="text-gray-500 mb-4">Browse our detailed documentation</p>
          <Button variant="outlined" color="primary">View Docs</Button>
        </Card>

        <Card className="p-6 text-center">
          <ContactSupportIcon className="text-4xl text-primary-600 mb-3" />
          <h3 className="text-lg font-semibold mb-2">Contact Support</h3>
          <p className="text-gray-500 mb-4">Get help from our support team</p>
          <Button variant="outlined" color="primary">Contact Us</Button>
        </Card>

        <Card className="p-6 text-center">
          <HelpIcon className="text-4xl text-primary-600 mb-3" />
          <h3 className="text-lg font-semibold mb-2">FAQs</h3>
          <p className="text-gray-500 mb-4">Find answers to common questions</p>
          <Button variant="outlined" color="primary">View FAQs</Button>
        </Card>
      </div>

      {/* FAQs Section */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Frequently Asked Questions</h2>
        <div className="space-y-3">
          {filteredFaqs.map((faq, index) => (
            <Accordion key={index}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography className="font-medium">{faq.question}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography className="text-gray-600">{faq.answer}</Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </div>
      </div>

      {/* Documentation Section */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Documentation</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {documentation.map((doc, index) => (
            <Card key={index} className="p-4">
              <div className="flex items-start">
                <div className="p-2 rounded-full bg-primary-50 text-primary-600">
                  {doc.icon}
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium">{doc.title}</h3>
                  <p className="text-gray-500 mt-1">{doc.description}</p>
                  <Button
                    variant="text"
                    color="primary"
                    className="mt-2"
                  >
                    Learn More
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Help; 