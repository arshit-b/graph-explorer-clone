import React from 'react';
import {Box} from '@mui/material';
import CreateUser from 'src/components/CreateUser';
import {User} from 'src/types';
import UserList from 'src/components/UserList';
import {useData} from 'src/store/DataProvider';

const Users = () => {
  const {userList, registerNewUser} = useData();
  const handleCreateUser = (user: User) => {
    registerNewUser(user);
  };
  return (
    <Box className={'py-4'}>
      <CreateUser onSubmit={handleCreateUser} />
      <UserList className={'mt-6'} list={userList} />
    </Box>
  );
};

export default Users;
