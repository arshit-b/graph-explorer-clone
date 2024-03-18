import React from 'react';
import {Box, Typography} from '@mui/material';
import {useData} from 'src/store/DataProvider';
import UserItem from 'src/components/UserItem';

const Users = () => {
  const {userList, registerNewUser} = useData();

  return (
    <Box height={'100%'} className={'overflow-y-scroll py-4'}>
      <Box className={'flex items-center justify-center'}>
        <Typography variant={'h4'} className={'text-center'}>
          Users
        </Typography>
      </Box>
      <Box className={'flex flex-col flex-grow m-auto w-fit'}>
        {userList.map((user) => (
          <UserItem key={user.address} user={user} />
        ))}
      </Box>
    </Box>
  );
};

export default Users;
