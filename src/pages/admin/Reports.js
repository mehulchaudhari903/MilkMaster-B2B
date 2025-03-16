import React from 'react';
import { Card, Grid, Button } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import BarChartIcon from '@mui/icons-material/BarChart';
import TimelineIcon from '@mui/icons-material/Timeline';
import PieChartIcon from '@mui/icons-material/PieChart';

function Reports() {
  // Sample data - replace with actual data from your backend
  const reports = [
    {
      title: 'Sales Report',
      description: 'Daily, weekly, and monthly sales analysis',
      icon: <BarChartIcon className="w-8 h-8 text-blue-500" />,
      type: 'sales'
    },
    {
      title: 'Inventory Report',
      description: 'Stock levels and product movement',
      icon: <TimelineIcon className="w-8 h-8 text-green-500" />,
      type: 'inventory'
    },
    {
      title: 'Customer Analytics',
      description: 'Customer behavior and demographics',
      icon: <PieChartIcon className="w-8 h-8 text-purple-500" />,
      type: 'customers'
    },
    {
      title: 'Financial Summary',
      description: 'Revenue, expenses, and profit analysis',
      icon: <BarChartIcon className="w-8 h-8 text-orange-500" />,
      type: 'financial'
    }
  ];

  const handleDownload = (reportType) => {
    // Implement report download logic here
    console.log(`Downloading ${reportType} report`);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Reports</h1>
      </div>

      <Grid container spacing={3}>
        {reports.map((report) => (
          <Grid item xs={12} md={6} lg={4} key={report.type}>
            <Card className="p-6">
              <div className="flex items-start">
                <div className="p-3 rounded-full bg-gray-100">
                  {report.icon}
                </div>
                <div className="ml-4 flex-1">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {report.title}
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">
                    {report.description}
                  </p>
                  <div className="mt-4 flex space-x-3">
                    <Button
                      variant="contained"
                      color="primary"
                      startIcon={<DownloadIcon />}
                      onClick={() => handleDownload(report.type)}
                      className="bg-primary-600"
                    >
                      Download
                    </Button>
                    <Button
                      variant="outlined"
                      color="primary"
                    >
                      View
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Recent Reports Section */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Reports</h2>
        <Card className="p-6">
          <div className="space-y-4">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="flex items-center justify-between py-3 border-b border-gray-200 last:border-0"
              >
                <div>
                  <h4 className="text-sm font-medium text-gray-900">
                    Sales Report - March 2024
                  </h4>
                  <p className="text-xs text-gray-500 mt-1">
                    Generated on March {item + 10}, 2024
                  </p>
                </div>
                <Button
                  variant="text"
                  color="primary"
                  startIcon={<DownloadIcon />}
                >
                  Download
                </Button>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

export default Reports; 