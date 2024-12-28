import React from 'react';
import { AppBar, Toolbar, Button, Typography, Box } from '@mui/material';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <AppBar position="sticky" sx={{ backgroundColor: '#333' }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          <Button color="inherit" 
              sx={{
                textTransform: 'none',
                fontFamily: 'Roboto, sans-serif',
                fontSize: '1.25rem',
                fontWeight: 500,
                lineHeight: 1.6,
                letterSpacing: '0.0075em',
                padding: 0,
                minWidth: 0,
                '&:hover': {
                  textDecoration: 'none',
                  backgroundColor: 'transparent',
                },
              }} component={Link} to="/">
            Tokyo Ghoul DB
          </Button>
        </Typography>

        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button color="inherit" component={Link} to="/">Home</Button>
          <Button color="inherit" component={Link} to="/tier-list">Tier List</Button>
          <Button color="inherit" component={Link} to="/character-list">Character List</Button>
          <Button color="inherit" component={Link} to="/team-builder">Team Builder</Button>
          <Button color="inherit" component={Link} to="/equipment">Equipment</Button>
          <Button color="inherit" component={Link} to="/guide">Guide</Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
