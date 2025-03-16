import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  MenuItem,
  Badge,
  Avatar,
  useMediaQuery,
  useTheme,
  Tooltip
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useNavigate } from 'react-router-dom';

function AdminNavbar({ toggleSidebar }) {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [anchorEl, setAnchorEl] = useState(null);
  const [notificationAnchorEl, setNotificationAnchorEl] = useState(null);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleNotificationMenuOpen = (event) => {
    setNotificationAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setNotificationAnchorEl(null);
  };

  const handleLogout = () => {
    // Implement logout logic here
    handleMenuClose();
    navigate('/admin-login');
  };

  return (
    <AppBar 
      position="sticky" 
      sx={{ 
        backgroundColor: 'white',
        color: 'text.primary',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        zIndex: (theme) => theme.zIndex.drawer + 1
      }}
      className="transition-all duration-300"
    >
      <Toolbar className="px-2 md:px-6">
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
            onClick={toggleSidebar}
          // sx={{ 
          //   mr: 2,
          //   display: { xs: 'flex', lg: 'none' }
          // }}
          // className="lg:hidden"
        >
          <MenuIcon />
        </IconButton>

        <Typography 
          variant="h6" 
          component="div" 
          sx={{ 
            flexGrow: 1,
            fontSize: { xs: '1rem', sm: '1.25rem' }
          }}
          className="truncate"
        >
          {/* {isMobile ? 'Admin' : 'Milk Dairy Admin'} */}
        </Typography>

        <div className="flex items-center space-x-1 md:space-x-3">
          {/* Notifications */}
          <Tooltip title="Notifications">
            <IconButton 
              color="inherit"
              onClick={handleNotificationMenuOpen}
              size={isMobile ? "small" : "medium"}
            >
              <Badge 
                badgeContent={4} 
                color="error"
                sx={{
                  '& .MuiBadge-badge': {
                    fontSize: '0.65rem',
                    height: '16px',
                    minWidth: '16px'
                  }
                }}
              >
                <NotificationsIcon sx={{ fontSize: isMobile ? 20 : 24 }} />
              </Badge>
            </IconButton>
          </Tooltip>

          {/* Profile */}
          <Tooltip title="Profile">
            <IconButton
              color="inherit"
              onClick={handleProfileMenuOpen}
              size={isMobile ? "small" : "medium"}
            >
              <Avatar 
                sx={{ 
                  width: isMobile ? 28 : 32, 
                  height: isMobile ? 28 : 32 
                }}
              >
                <AccountCircleIcon sx={{ fontSize: isMobile ? 20 : 24 }} />
              </Avatar>
            </IconButton>
          </Tooltip>
        </div>

        {/* Profile Menu */}
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          PaperProps={{
            elevation: 2,
            sx: {
              mt: 1.5,
              minWidth: 180,
              '& .MuiMenuItem-root': {
                fontSize: '0.875rem',
                py: 1
              }
            }
          }}
        >
          <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
          <MenuItem onClick={handleMenuClose}>Settings</MenuItem>
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Menu>

        {/* Notifications Menu */}
        <Menu
          anchorEl={notificationAnchorEl}
          open={Boolean(notificationAnchorEl)}
          onClose={handleMenuClose}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          PaperProps={{
            elevation: 2,
            sx: {
              mt: 1.5,
              minWidth: 280,
              maxWidth: '90vw',
              '& .MuiMenuItem-root': {
                fontSize: '0.875rem',
                py: 1.5,
                px: 2,
                whiteSpace: 'normal'
              }
            }
          }}
        >
          <MenuItem onClick={handleMenuClose} className="flex flex-col items-start">
            <span className="font-medium">New order received</span>
            <span className="text-xs text-gray-500 mt-1">2 minutes ago</span>
          </MenuItem>
          <MenuItem onClick={handleMenuClose} className="flex flex-col items-start">
            <span className="font-medium">Low stock alert</span>
            <span className="text-xs text-gray-500 mt-1">5 minutes ago</span>
          </MenuItem>
          <MenuItem onClick={handleMenuClose} className="flex flex-col items-start">
            <span className="font-medium">Payment received</span>
            <span className="text-xs text-gray-500 mt-1">10 minutes ago</span>
          </MenuItem>
          <MenuItem onClick={handleMenuClose} className="flex flex-col items-start">
            <span className="font-medium">New user registration</span>
            <span className="text-xs text-gray-500 mt-1">1 hour ago</span>
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
}

export default AdminNavbar; 