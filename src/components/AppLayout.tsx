import React, {useState} from 'react';
import {Box, CssBaseline} from '@mui/material';
import Navbar from 'src/components/Navbar';
import {Outlet} from 'react-router-dom';
import CreateTransactionModal from 'src/components/CreateTransactionModal';

type Props = {};

const AppLayout = (props: Props) => {
	const [showTransactionModal, setShowTransactionModal] = useState(false);
	return (
		<Box className={'pt-16'}>
			<CssBaseline />
			<Navbar onPressCreateTransaction={() => setShowTransactionModal(true)}/>
			<Box component="main">
				<Outlet />
			</Box>
			<CreateTransactionModal
				open={showTransactionModal}
				onClose={() => setShowTransactionModal(false)}
			/>
		</Box>
	);
}

export default AppLayout;
