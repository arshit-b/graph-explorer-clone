import React from 'react';
import {Box, Typography} from '@mui/material';
import {User} from 'src/types';

type Props = {
  user: User;
  truncateAddress?: boolean;
};

const UserItem = ({user, truncateAddress, ...restProps}: Props) => {
  const {name, address, imageUri} = user;
  return (
    <Box
      key={`${name}-${address}`}
      className={'flex flex-row items-center gap-2'}
      {...restProps}>
      <>
        <img
          src={imageUri}
          alt={name}
          className={'h-8 sm:h-10 rounded-full'}
        />
        <Box>
          <Typography fontSize={{xs: 13, sm: 16}}>{name}</Typography>
          <Typography fontSize={{xs: 12, sm: 14}}>
            {truncateAddress ? address.substring(3, 11) : address}
          </Typography>
        </Box>
      </>
    </Box>
  );
};

export default UserItem;
