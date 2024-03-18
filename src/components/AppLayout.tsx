import React from 'react';
import {Box, CssBaseline, Grid} from '@mui/material';
import Navbar from 'src/components/Navbar';
import {Outlet} from 'react-router-dom';

const AppLayout = () => {
  return (
    <Box>
      <CssBaseline />
      <Outlet />
    </Box>
  );
};

export default AppLayout;
