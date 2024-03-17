import React from 'react';
import {User} from 'src/types';
import {Box, Typography} from '@mui/material';
import {Person} from '@mui/icons-material';

type Props = {
  list: User[];
  className?: string;
};

const UserList = ({list, className}: Props) => {
  return (
    <Box className={className}>
      <Typography variant={'h4'} className={'text-center'}>
        User list
      </Typography>

      {list.map(({name, address}) => (
        <Box
          key={`${name}-${address}`}
          className={'flex items-center justify-center gap-2 border-b mt-2'}>
          <Person className={'m-2'} />
          <Box>
            <Typography variant={'h6'}>{name}</Typography>
            <Typography variant={'subtitle1'}>{address}</Typography>
          </Box>
        </Box>
      ))}
    </Box>
  );
};

export default UserList;
