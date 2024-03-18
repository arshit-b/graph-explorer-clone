import React from 'react';
import {Autocomplete, AutocompleteProps, TextField} from '@mui/material';
import {User} from 'src/types';
import UserItem from 'src/components/UserItem';

type Props<T extends User> = {
  label: string;
} & Omit<AutocompleteProps<T, any, any, any>, 'renderInput' | 'renderOption'>;

const SelectUser = <T extends User>({
  options,
  label,
  value,
  ...restProps
}: Props<T>) => {
  return (
    <Autocomplete
      className={'min-w-80'}
      value={value}
      isOptionEqualToValue={(option, value) => {
        if (typeof option === 'string' || value == null) return false;
        // @ts-ignore
        return option?.address === value?.address;
      }}
      options={options.map((user) => ({...user, label: user.name}))}
      renderOption={(props: any, user, state) => (
        <UserItem user={user} truncateAddress {...props} />
      )}
      renderInput={(params) => <TextField {...params} label={label} />}
      {...restProps}
    />
  );
};

export default SelectUser;
