import React from 'react';
import {Person} from '@mui/icons-material';
import {Box, Typography} from '@mui/material';
import {User} from 'src/types';

type Props = {
	user: User
};

const UserItem = ({user, ...restProps}: Props) => {
	const {name, address} = user;
	return (
		<Box
			key={`${name}-${address}`}
			className={'flex items-center justify-center gap-2 border-b mt-2'}
			{...restProps}
		>
			<Person className={'m-2'} />
			<Box>
				<Typography variant={'h6'}>{name}</Typography>
				<Typography variant={'subtitle1'}>{address}</Typography>
			</Box>
		</Box>
	);
}

export default UserItem;
