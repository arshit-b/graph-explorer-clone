import React from 'react';
import {Backdrop, Box, Fade, Modal, Typography} from '@mui/material';

type Props = {
	open: boolean;
	onClose: () => void;
};

const CreateTransactionModal = ({open, onClose}: Props) => {
	return (
		<Modal
			aria-labelledby="transition-modal-title"
			aria-describedby="transition-modal-description"
			open={open}
			onClose={onClose}
			closeAfterTransition
			slots={{ backdrop: Backdrop }}
			slotProps={{
				backdrop: {
					timeout: 500,
				},
			}}
		>
			<Fade in={open}>
				<Box className={'absolute to-50%'}>
					<Typography id="transition-modal-title" variant="h6" component="h2">
						Text in a modal
					</Typography>
					<Typography id="transition-modal-description" sx={{ mt: 2 }}>
						Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
					</Typography>
				</Box>
			</Fade>
		</Modal>
	);
}

export default CreateTransactionModal;
