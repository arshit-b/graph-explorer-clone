import React from 'react';
import {CssBaseline, Grid} from '@mui/material';
import Navbar from 'src/components/Navbar';
import {Outlet} from 'react-router-dom';

const AppLayout = () => {
  return (
    <Grid container className={'pt-16'}>
      <CssBaseline />
      <Navbar />
      <Grid component="main" xs={12}>
        <Outlet />
      </Grid>
    </Grid>
  );
};

export default AppLayout;
