import React from 'react';
import {Box, CssBaseline, Grid} from '@mui/material';
import Navbar from 'src/components/Navbar';
import {Outlet} from 'react-router-dom';

const AppLayout = () => {
  return (
    <Grid container height={'100vh'} display={'flex'} width={'100vw'}>
      <CssBaseline />

      <Navbar />
      <Grid
        height={'calc(100% - 64px)'}
        width={'100%'}
        component="main"
        xs={12}>
        <Outlet />
      </Grid>
    </Grid>
  );
};

export default AppLayout;
