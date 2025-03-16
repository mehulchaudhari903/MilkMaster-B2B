import React, { useState, useRef } from 'react';
import {
  Card,
  TextField,
  Button,
  Switch,
  FormControlLabel,
  Grid,
  Alert,
  Snackbar,
  InputAdornment,
  Select,
  MenuItem as SelectItem,
  FormControl,
  InputLabel,
  Avatar,
  Divider,
  IconButton,
  Box,
  Typography
} from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SecurityIcon from '@mui/icons-material/Security';
import LanguageIcon from '@mui/icons-material/Language';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import BusinessIcon from '@mui/icons-material/Business';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import LockIcon from '@mui/icons-material/Lock';
import BadgeIcon from '@mui/icons-material/Badge';
import WorkIcon from '@mui/icons-material/Work';

function Settings() {
  const fileInputRef = useRef(null);
  const [settings, setSettings] = useState({
    // Profile Settings
    firstName: 'John',
    lastName: 'Doe',
    email: 'admin@milkdairy.com',
    phone: '+91 1234567890',
    position: 'Admin Manager',
    bio: 'Experienced dairy management professional with expertise in supply chain and operations.',
    avatar: null,
    
    // Password Change
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',

    // Company Settings
    companyName: 'Milk Dairy',
    companyEmail: 'admin@milkdairy.com',
    companyPhone: '+91 1234567890',
    address: '123 Dairy Street, City, State, 123456',
    
    // Notification Settings
    emailNotifications: true,
    orderNotifications: true,
    stockAlerts: true,
    
    // Security Settings
    twoFactorAuth: false,
    passwordExpiry: '30',
    
    // Regional Settings
    language: 'English',
    currency: 'INR',
    dateFormat: 'DD/MM/YYYY',
    timeZone: 'Asia/Kolkata'
  });

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });

  const handleChange = (field) => (event) => {
    const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
    setSettings(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleAvatarChange = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSettings(prev => ({
          ...prev,
          avatar: e.target?.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    // Here you would typically make an API call to save the settings
    console.log('Saving settings:', settings);
    setSnackbar({
      open: true,
      message: 'Settings saved successfully!',
      severity: 'success'
    });
  };

  const handlePasswordChange = () => {
    if (settings.newPassword !== settings.confirmPassword) {
      setSnackbar({
        open: true,
        message: 'New passwords do not match!',
        severity: 'error'
      });
      return;
    }
    // Here you would make an API call to change the password
    console.log('Changing password');
    setSnackbar({
      open: true,
      message: 'Password changed successfully!',
      severity: 'success'
    });
    // Clear password fields
    setSettings(prev => ({
      ...prev,
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    }));
  };

  const handleCloseSnackbar = () => {
    setSnackbar(prev => ({ ...prev, open: false }));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Settings</h1>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSave}
          className="bg-primary-600 hover:bg-primary-700"
        >
          Save Changes
        </Button>
      </div>

      <Grid container spacing={4}>
        {/* Profile Settings */}
        <Grid item xs={12} lg={6}>
          <Card className="p-6">
            <div className="flex items-center mb-6">
              <AccountCircleIcon className="text-gray-500 mr-2" />
              <h2 className="text-lg font-semibold">Profile Settings</h2>
            </div>
            
            {/* Avatar Upload */}
            <div className="flex flex-col items-center mb-6">
              <Box className="relative">
                <Avatar
                  src={settings.avatar}
                  sx={{ width: 100, height: 100, mb: 2 }}
                  className="border-2 border-gray-200"
                >
                  {!settings.avatar && (
                    <AccountCircleIcon sx={{ fontSize: 60 }} />
                  )}
                </Avatar>
                <IconButton
                  className="absolute bottom-0 right-0 bg-white shadow-md hover:bg-gray-100"
                  size="small"
                  onClick={handleAvatarClick}
                >
                  <CameraAltIcon fontSize="small" />
                </IconButton>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleAvatarChange}
                  accept="image/*"
                  className="hidden"
                />
              </Box>
              <Typography variant="caption" className="text-gray-500 mt-2">
                Click to upload new avatar
              </Typography>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <TextField
                  fullWidth
                  label="First Name"
                  value={settings.firstName}
                  onChange={handleChange('firstName')}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <BadgeIcon className="text-gray-400" />
                      </InputAdornment>
                    ),
                  }}
                />
                <TextField
                  fullWidth
                  label="Last Name"
                  value={settings.lastName}
                  onChange={handleChange('lastName')}
                />
              </div>
              <TextField
                fullWidth
                label="Position"
                value={settings.position}
                onChange={handleChange('position')}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <WorkIcon className="text-gray-400" />
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                fullWidth
                label="Email"
                type="email"
                value={settings.email}
                onChange={handleChange('email')}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailIcon className="text-gray-400" />
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                fullWidth
                label="Phone"
                value={settings.phone}
                onChange={handleChange('phone')}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PhoneIcon className="text-gray-400" />
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                fullWidth
                label="Bio"
                multiline
                rows={3}
                value={settings.bio}
                onChange={handleChange('bio')}
              />
            </div>

            <Divider className="my-6" />

            {/* Password Change Section */}
            <div className="space-y-4">
              <div className="flex items-center mb-4">
                <LockIcon className="text-gray-500 mr-2" />
                <h3 className="text-md font-semibold">Change Password</h3>
              </div>
              <TextField
                fullWidth
                label="Current Password"
                type="password"
                value={settings.currentPassword}
                onChange={handleChange('currentPassword')}
              />
              <TextField
                fullWidth
                label="New Password"
                type="password"
                value={settings.newPassword}
                onChange={handleChange('newPassword')}
              />
              <TextField
                fullWidth
                label="Confirm New Password"
                type="password"
                value={settings.confirmPassword}
                onChange={handleChange('confirmPassword')}
              />
              <Button
                variant="outlined"
                color="primary"
                onClick={handlePasswordChange}
                className="mt-2"
              >
                Change Password
              </Button>
            </div>
          </Card>
        </Grid>

        {/* Company Settings */}
        <Grid item xs={12} lg={6}>
          <Card className="p-6">
            <div className="flex items-center mb-6">
              <BusinessIcon className="text-gray-500 mr-2" />
              <h2 className="text-lg font-semibold">Company Settings</h2>
            </div>
            <div className="space-y-4">
              <TextField
                fullWidth
                label="Company Name"
                value={settings.companyName}
                onChange={handleChange('companyName')}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <BusinessIcon className="text-gray-400" />
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                fullWidth
                label="Company Email"
                type="email"
                value={settings.companyEmail}
                onChange={handleChange('companyEmail')}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailIcon className="text-gray-400" />
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                fullWidth
                label="Company Phone"
                value={settings.companyPhone}
                onChange={handleChange('companyPhone')}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PhoneIcon className="text-gray-400" />
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                fullWidth
                multiline
                rows={3}
                label="Address"
                value={settings.address}
                onChange={handleChange('address')}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LocationOnIcon className="text-gray-400" />
                    </InputAdornment>
                  ),
                }}
              />
            </div>
          </Card>
        </Grid>

        {/* Notification Settings */}
        <Grid item xs={12} lg={6}>
          <Card className="p-6">
            <div className="flex items-center mb-6">
              <NotificationsIcon className="text-gray-500 mr-2" />
              <h2 className="text-lg font-semibold">Notification Settings</h2>
            </div>
            <div className="space-y-4">
              <FormControlLabel
                control={
                  <Switch
                    checked={settings.emailNotifications}
                    onChange={handleChange('emailNotifications')}
                    color="primary"
                  />
                }
                label="Email Notifications"
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={settings.orderNotifications}
                    onChange={handleChange('orderNotifications')}
                    color="primary"
                  />
                }
                label="Order Notifications"
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={settings.stockAlerts}
                    onChange={handleChange('stockAlerts')}
                    color="primary"
                  />
                }
                label="Low Stock Alerts"
              />
            </div>
          </Card>
        </Grid>

        {/* Security Settings */}
        <Grid item xs={12} lg={6}>
          <Card className="p-6">
            <div className="flex items-center mb-6">
              <SecurityIcon className="text-gray-500 mr-2" />
              <h2 className="text-lg font-semibold">Security Settings</h2>
            </div>
            <div className="space-y-4">
              <FormControlLabel
                control={
                  <Switch
                    checked={settings.twoFactorAuth}
                    onChange={handleChange('twoFactorAuth')}
                    color="primary"
                  />
                }
                label="Two-Factor Authentication"
              />
              <TextField
                fullWidth
                label="Password Expiry (days)"
                type="number"
                value={settings.passwordExpiry}
                onChange={handleChange('passwordExpiry')}
              />
            </div>
          </Card>
        </Grid>

        {/* Regional Settings */}
        <Grid item xs={12} lg={6}>
          <Card className="p-6">
            <div className="flex items-center mb-6">
              <LanguageIcon className="text-gray-500 mr-2" />
              <h2 className="text-lg font-semibold">Regional Settings</h2>
            </div>
            <div className="space-y-4">
              <FormControl fullWidth>
                <InputLabel>Language</InputLabel>
                <Select
                  value={settings.language}
                  onChange={handleChange('language')}
                  label="Language"
                >
                  <SelectItem value="English">English</SelectItem>
                  <SelectItem value="Hindi">Hindi</SelectItem>
                </Select>
              </FormControl>

              <FormControl fullWidth>
                <InputLabel>Currency</InputLabel>
                <Select
                  value={settings.currency}
                  onChange={handleChange('currency')}
                  label="Currency"
                >
                  <SelectItem value="INR">Indian Rupee (₹)</SelectItem>
                  <SelectItem value="USD">US Dollar ($)</SelectItem>
                </Select>
              </FormControl>

              <FormControl fullWidth>
                <InputLabel>Date Format</InputLabel>
                <Select
                  value={settings.dateFormat}
                  onChange={handleChange('dateFormat')}
                  label="Date Format"
                >
                  <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
                  <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
                  <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
                </Select>
              </FormControl>

              <FormControl fullWidth>
                <InputLabel>Time Zone</InputLabel>
                <Select
                  value={settings.timeZone}
                  onChange={handleChange('timeZone')}
                  label="Time Zone"
                >
                  <SelectItem value="Asia/Kolkata">Asia/Kolkata (IST)</SelectItem>
                  <SelectItem value="UTC">UTC</SelectItem>
                </Select>
              </FormControl>
            </div>
          </Card>
        </Grid>
      </Grid>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert 
          onClose={handleCloseSnackbar} 
          severity={snackbar.severity}
          variant="filled"
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default Settings;