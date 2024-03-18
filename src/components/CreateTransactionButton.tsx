import React, {useMemo, useState} from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  IconButton,
  Input,
  InputAdornment,
  Tooltip,
  Typography,
} from '@mui/material';

import {Payments} from '@mui/icons-material';
import {useData} from 'src/store/DataProvider';
import SelectUser from 'src/components/SelectUser';
import {User} from 'src/types';
import {makeTransactionObject} from 'src/utils';

const CreateTransactionButton = () => {
  const {userList, registerTransaction} = useData();

  const [fromUser, setFromUser] = useState<User | null>(null);

  const [toUser, setToUser] = useState<User | null>(null);

  const [open, setOpen] = React.useState(false);

  const [amount, setAmount] = useState(0);

  const fromUserOptions = useMemo(() => {
    return userList.filter(
      (user) => !toUser || user.address !== toUser.address,
    );
  }, [toUser, userList]);

  const toUserOptions = useMemo(() => {
    return userList.filter(
      (user) => !fromUser || user.address !== fromUser.address,
    );
  }, [fromUser, userList]);

  const handleChangeFromUser = (event: React.SyntheticEvent, user: User) => {
    event.stopPropagation();
    setFromUser(user);
  };
  const handleChangeToUser = (event: React.SyntheticEvent, user: User) => {
    event.stopPropagation();
    setToUser(user);
  };

  const handleCreateTransaction = () => {
    registerTransaction(
      makeTransactionObject(fromUser.address, toUser.address, amount),
    );
  };

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = (
    event: React.SyntheticEvent<unknown>,
    reason?: string,
  ) => {
    if (reason !== 'backdropClick') {
      setAmount(0);
      setToUser(null);
      setFromUser(null);
      setOpen(false);
    }
  };
  return (
    <div>
      <Tooltip title="Create transaction">
        <IconButton sx={{color: '#fff'}} onClick={handleClickOpen}>
          <Payments />
        </IconButton>
      </Tooltip>
      <Dialog
        maxWidth={'xs'}
        fullWidth
        keepMounted={false}
        disableEscapeKeyDown
        open={open}
        onClose={handleClose}>
        <DialogContent>
          <Typography
            mb={2}
            variant={'h6'}
            textAlign={'center'}
            fontWeight={'bold'}>
            Create transaction
          </Typography>
          <SelectUser
            className={'mt-2'}
            value={fromUser}
            onChange={handleChangeFromUser}
            options={fromUserOptions}
            label={'From'}
          />
          <SelectUser
            className={'mt-4'}
            value={toUser}
            onChange={handleChangeToUser}
            options={toUserOptions}
            label={'To'}
          />
          <Input
            type={'number'}
            value={amount ? amount.toString() : ''}
            onChange={(event) => {
              const value = event.target.value;
              setAmount(Math.abs(Number(value)));
            }}
            slotProps={{root: {className: 'p-2 mt-4'}, input: {min: 1}}}
            placeholder={'Amount'}
            startAdornment={
              <InputAdornment className={'mr-2'} position={'start'}>
                <Typography className={'text-black'}>$</Typography>
              </InputAdornment>
            }
          />
        </DialogContent>
        <DialogActions onClick={handleClose}>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            disabled={!fromUser || !toUser || !amount}
            onClick={handleCreateTransaction}>
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default CreateTransactionButton;
