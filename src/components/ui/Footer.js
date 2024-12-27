import React from 'react';
import { Box, Typography, Link } from '@mui/material';

const Footer = () => {
  return (
    <Box
      sx={{
        padding: '2rem',
        backgroundColor: '#333',
        color: 'white',
        textAlign: 'center',
        marginTop: 'auto',
      }}
    >
      <Typography variant="body2" sx={{ marginBottom: '1rem' }}>
        BTC Database is not affiliated with Tokyo Ghoul or its creators. This is a fan-made project for educational purposes.
      </Typography>
      <Typography variant="body2">
        <Link href="/donations" color="inherit" sx={{ textDecoration: 'none', marginRight: 2, marginLeft: 2 }}>
          Donations
        </Link> 
        <span>|</span> 
        <Link href="/special-thanks" color="inherit" sx={{ textDecoration: 'none', marginRight: 2, marginLeft: 2 }}>
          Special Thanks
        </Link> 
        <span>|</span> 
        <Link href="/privacy-policy" color="inherit" sx={{ textDecoration: 'none', marginLeft: 2 }}>
          Privacy Policy
        </Link>
      </Typography>
    </Box>
  );
};

export default Footer;
