import React, {useState} from 'react';
import {Box, CssBaseline} from '@mui/material';
import Navbar from 'src/components/Navbar';
import {Outlet} from 'react-router-dom';
import CreateTransactionButton from 'src/components/CreateTransactionButton';

type Props = {};

const AppLayout = (props: Props) => {
  return (
    <Box className={'pt-16'}>
      <CssBaseline />
      <Navbar />
      <Box component="main">
        <Outlet />
      </Box>

    </Box>
  );
};

export default AppLayout;
