import React from 'react';
import {
  AppBar,
  Box,
  Button,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
  Typography,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import {Link, useNavigate} from 'react-router-dom';
import {Add} from '@mui/icons-material';
import CreateTransactionButton from 'src/components/CreateTransactionButton';
import CreateUserButton from 'src/components/CreateUserButton';

type Props = {
  window?: () => Window;
};

const navItems = [
  {
    name: 'Users',
    path: '/0x',
  },
];

const NavbarItems = ({onClickItem, className = ''}) => (
  <List className={className}>
    {navItems.map((item) => (
      <ListItem key={item.name} disablePadding>
        <ListItemButton
          onClick={(e) => {
            onClickItem(e, item.path);
          }}>
          <ListItemText primary={item.name} />
        </ListItemButton>
      </ListItem>
    ))}
  </List>
);

const NavLogo = ({onClick, sx = {}}) => (
  <Typography onClick={onClick} variant="h5" component="div" sx={sx}>
    0xPPL
  </Typography>
);

const Navbar = (props: Props) => {
  const {window} = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const navigate = useNavigate();
  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const handleClickNavItem = (path: string) => {
    navigate(path);
  };

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <>
      <AppBar position={'relative'} component={'nav'}>
        <Toolbar className={'gap-4'}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{mr: 2, display: {sm: 'none'}}}>
            <MenuIcon />
          </IconButton>
          <NavLogo
            onClick={() => handleClickNavItem('/')}
            sx={{cursor: 'pointer', display: {xs: 'none', sm: 'block'}}}
          />
          <Box sx={{display: {xs: 'none', sm: 'block'}}}>
            <NavbarItems onClickItem={(_, path) => handleClickNavItem(path)} />
          </Box>
          <CreateTransactionButton />
          <CreateUserButton />
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClick={handleDrawerToggle}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: {xs: 'block', sm: 'none'},
            '& .MuiDrawer-paper': {boxSizing: 'border-box', width: '80%'},
          }}>
          <NavLogo
            onClick={() => handleClickNavItem('/')}
            sx={{cursor: 'pointer', p: 2, display: {xs: 'block', sm: 'none'}}}
          />
          <Divider />
          <NavbarItems onClickItem={(_, path) => handleClickNavItem(path)} />
        </Drawer>
      </nav>
    </>
  );
};

export default Navbar;
