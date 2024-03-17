import React from 'react';
import {User} from 'src/types';
import {Box, List, ListItem, Typography} from '@mui/material';
import {Person} from '@mui/icons-material';
import UserItem from 'src/components/UserItem';

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
      {list.map((user) => <UserItem key={user.address} user={user}/>)}
    </Box>
  );
};

export default UserList;
