import React, {useState} from 'react';
import {Box} from '@mui/material';
import CreateUser from 'src/components/CreateUser';
import {User} from 'src/types';
import UserList from 'src/components/UserList';

const Users = () => {

	const [useList, setUseList] = useState([]);
	const handleCreateUser = (user: User) => {
		setUseList((prevUserList) => [user, ...prevUserList]);
	}
	return (
		<Box className={'py-4'}>
			<CreateUser onSubmit={handleCreateUser}/>
			<UserList className={'mt-6'} list={useList}/>
		</Box>
	);
}

export default Users;
