import React from 'react';
import { AppBar, Toolbar, Button, Typography, Box } from '@mui/material';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <AppBar position="sticky" sx={{ backgroundColor: '#333' }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Tokyo Ghoul DB
        </Typography>

        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button color="inherit" component={Link} to="/">Home</Button>
          <Button color="inherit" component={Link} to="/tier-list">Tier List</Button>
          <Button color="inherit" component={Link} to="/team-builder">Team Builder</Button>
          <Button color="inherit" component={Link} to="/equipment">Equipment</Button>
          <Button color="inherit" component={Link} to="/guide">Guide</Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
