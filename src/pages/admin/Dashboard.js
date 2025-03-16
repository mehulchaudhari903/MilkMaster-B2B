import React from 'react';
import { Card } from '@mui/material';
import BarChartIcon from '@mui/icons-material/BarChart';
import PeopleIcon from '@mui/icons-material/People';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Inventory2Icon from '@mui/icons-material/Inventory2';

function Dashboard() {
  const stats = [
    {
      title: 'Total Sales',
      value: '₹45,231',
      icon: <BarChartIcon className="text-blue-500" />,
      change: '+12.5%',
      positive: true
    },
    {
      title: 'Total Orders',
      value: '356',
      icon: <ShoppingCartIcon className="text-green-500" />,
      change: '+8.2%',
      positive: true
    },
    {
      title: 'Total Products',
      value: '124',
      icon: <Inventory2Icon className="text-purple-500" />,
      change: '+2.4%',
      positive: true
    },
    {
      title: 'Total Customers',
      value: '2,450',
      icon: <PeopleIcon className="text-orange-500" />,
      change: '+4.7%',
      positive: true
    }
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold text-gray-900 mb-6">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">{stat.title}</p>
                <h3 className="text-2xl font-semibold mt-1">{stat.value}</h3>
                <div className={`flex items-center mt-2 ${
                  stat.positive ? 'text-green-600' : 'text-red-600'
                }`}>
                  <span className="text-sm">{stat.change}</span>
                </div>
              </div>
              <div className="p-3 rounded-full bg-gray-100">
                {stat.icon}
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Add more dashboard content here */}
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">Recent Orders</h2>
          {/* Add recent orders table/list here */}
        </Card>
        
        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">Sales Analytics</h2>
          {/* Add sales chart here */}
        </Card>
      </div>
    </div>
  );
}

export default Dashboard; 