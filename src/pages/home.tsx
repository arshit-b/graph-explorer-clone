import React from 'react';
import {Box, Button, IconButton, Typography} from '@mui/material';
import {Add} from '@mui/icons-material';
import {useData} from 'src/store/DataProvider';

type Props = {};

const Home = (props: Props) => {
  const {transactions} = useData()
  return <Box>
    {transactions.map((transactions) => (
      <Box>
        <Typography variant={'h6'}>{transactions.fromAddress}</Typography>
        <Typography variant={'h6'}>{transactions.toAddress}</Typography>
        <Typography variant={'subtitle1'}>{transactions.amount}</Typography>
      </Box>
    ))}
  </Box>;
};

export default Home;
