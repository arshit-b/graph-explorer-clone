import React, {useState} from 'react';
import {PersonAdd} from '@mui/icons-material';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  IconButton,
  TextField,
  Typography,
} from '@mui/material';
import {useData} from 'src/store/DataProvider';
import {makeUserObject} from 'src/utils';

const CreateUserButton = () => {
  const {registerNewUser} = useData();
  const [userName, setUserName] = useState('');

  const handleNameChange = (e: Object) => {
    // @ts-ignore
    setUserName(e.target.value);
  };
  const [open, setOpen] = React.useState(false);
  const handleCreateUser = () => {
    const user = makeUserObject(userName);
    registerNewUser(user);
    setUserName('');
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <IconButton sx={{color: '#fff'}} onClick={handleClickOpen}>
        <PersonAdd />
      </IconButton>
      <Dialog
        keepMounted={false}
        maxWidth={'xs'}
        fullWidth
        open={open}
        onClose={handleClose}>
        <DialogContent>
          <Typography
            mb={2}
            variant={'h6'}
            textAlign={'center'}
            fontWeight={'bold'}>
            Create new user
          </Typography>
          <TextField
            label="Name"
            fullWidth
            variant="outlined"
            value={userName}
            onChange={handleNameChange}
          />
        </DialogContent>
        <DialogActions onClick={handleClose}>
          <Button onClick={handleClose}>Cancel</Button>
          <Button disabled={!userName} onClick={handleCreateUser}>
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default CreateUserButton;
