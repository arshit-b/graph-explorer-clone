import React from 'react';
import {
  AppBar,
  AppBarProps,
  IconButton,
  Toolbar,
  Typography,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import {useNavigate} from 'react-router-dom';
import {Group} from '@mui/icons-material';
import CreateTransactionButton from 'src/components/CreateTransactionButton';
import CreateUserButton from 'src/components/CreateUserButton';

type Props = {
  window?: () => Window;
  onPressMenu: () => void;
  onPressUserList: () => void;
} & AppBarProps;

const NavLogo = ({onClick, sx = {}}) => (
  <Typography onClick={onClick} variant="h5" component="div" sx={sx}>
    0xPPL
  </Typography>
);

const Navbar = (props: Props) => {
  const {onPressMenu, onPressUserList, ...restProps} = props;

  const navigate = useNavigate();

  const handleClickNavItem = (path: string) => {
    navigate(path);
  };
  return (
    <AppBar position={'fixed'} {...restProps}>
      <Toolbar className={'gap-4'}>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={onPressMenu}
          sx={{mr: 2, display: {sm: 'none'}}}>
          <MenuIcon />
        </IconButton>
        <NavLogo
          onClick={() => handleClickNavItem('/')}
          sx={{cursor: 'pointer', display: {xs: 'none', sm: 'block'}}}
        />
        <IconButton color="inherit" edge="start" onClick={onPressUserList}>
          <Group />
        </IconButton>
        <CreateTransactionButton />
        <CreateUserButton />
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
