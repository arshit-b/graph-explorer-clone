import React from 'react';
import {Person} from '@mui/icons-material';
import {Box, Typography} from '@mui/material';
import {User} from 'src/types';

type Props = {
  user: User;
  truncateAddress?: boolean;
};

const UserItem = ({user, truncateAddress, ...restProps}: Props) => {
  const {name, address} = user;
  return (
    <Box
      key={`${name}-${address}`}
      className={'flex flex-row items-center gap-2'}
      {...restProps}>
      <Person className={'mr-2'} />
      <Box>
        <Typography>{name}</Typography>
        <Typography>
          {truncateAddress ? address.substring(3, 11) : address}
        </Typography>
      </Box>
    </Box>
  );
};

export default UserItem;
