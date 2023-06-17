import React from 'react';
import { Link } from 'react-router-dom';
import { Avatar } from '@mui/material';

const Header = () => {
  return (
    <header style={{ backgroundColor: '#e0e0e0',padding: '16px', display: 'flex', justifyContent: 'flex-end' }}>
      <Avatar alt="User Avatar" src="/path/to/avatar-image.jpg" />
    </header>
  );
};

export default Header;
