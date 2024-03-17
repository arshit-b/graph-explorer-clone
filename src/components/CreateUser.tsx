import React, {useState} from 'react';
import {Box, Button, TextField, Typography} from '@mui/material';
import {User} from 'src/types';
import {makeUserObject} from 'src/utils';

type Props = {
  onSubmit: (user: User) => void;
};

const CreateUser = ({onSubmit}: Props) => {
  const [userName, setUserName] = useState('');

  const handleNameChange = (e: Object) => {
    // @ts-ignore
    setUserName(e.target.value);
  };
  const handleSubmit = () => {
    onSubmit(makeUserObject(userName));
    setUserName('');
  };
  return (
    <Box>
      <Typography
        variant="h5"
        className={'justify-center flex'}
        component="h2"
        gutterBottom>
        Create new user
      </Typography>
      <Box className={'flex justify-center items-center gap-4'}>
        <TextField
          label="Name"
          variant="outlined"
          value={userName}
          onChange={handleNameChange}
        />
        <Button
          variant="contained"
          disabled={!userName}
          onClick={handleSubmit}>
          Add
        </Button>
      </Box>
    </Box>
  );
};

export default CreateUser;
