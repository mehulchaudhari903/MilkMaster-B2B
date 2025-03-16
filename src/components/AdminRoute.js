import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

// Make sure there's no AdminPanel import here
// If this component imports AdminPanel, it would create a circular dependency

function AdminRoute({ children }) {
  const location = useLocation();
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Check if user is authenticated as admin
    // In a real app, this would verify JWT tokens or session cookies
    const checkAdmin = () => {
      const adminStatus = localStorage.getItem('isAdmin');
      setIsAdmin(adminStatus === 'true');
      setLoading(false);
    };
    
    checkAdmin();
  }, []);
  
  if (loading) {
    // You could add a loading spinner here
    return <div>Loading...</div>;
  }
  
  if (!isAdmin) {
    // Redirect to login if not authenticated
    return <Navigate to="/admin-login" state={{ from: location }} replace />;
  }
  
  return children;
}

export default AdminRoute; 