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
	ListItemButton, ListItemText,
	Toolbar,
	Typography,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import {Link, useNavigate} from 'react-router-dom';

type Props = {
	window?: () => Window;
};

const navItems = [{
	name: 'Users',
	path: '/0x',
},];
const Navbar = (props: Props) => {
	const { window } = props;
	const [mobileOpen, setMobileOpen] = React.useState(false);

	const navigate = useNavigate();
	const handleClickNavItem = (e:  any, path: string) => {
		e.stopPropagation();
		navigate(path);
	}
	const handleDrawerToggle = () => {
		setMobileOpen((prevState) => !prevState);
	};

	const drawer = (
		<Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
			<Typography variant="h6" sx={{ my: 2 }}>
				0xPPL
			</Typography>
			<Divider />
			<List>
				{navItems.map((item) => (
					<ListItem key={item.name} disablePadding>
						<ListItemButton onClick={(e) => {
							handleClickNavItem(e, item.path)
						}} sx={{ textAlign: 'center' }}>
							<ListItemText primary={item.name} />
						</ListItemButton>
					</ListItem>
				))}
			</List>
		</Box>
	);

	const container = window !== undefined ? () => window().document.body : undefined;

	return (
		<>
			<AppBar component={'nav'} className={'bg-black'}>
				<Toolbar>
					<IconButton
						color="inherit"
						aria-label="open drawer"
						edge="start"
						onClick={handleDrawerToggle}
						sx={{ mr: 2, display: { sm: 'none' } }}
					>
						<MenuIcon />
					</IconButton>
					<Typography
						onClick={(e) => handleClickNavItem(e, '/')}
						variant="h5"
						component="div"
						sx={{ flexGrow: 1, cursor: 'pointer', display: { xs: 'none', sm: 'block' } }}
					>
						0xPPL
					</Typography>
					<Box sx={{ display: { xs: 'none', sm: 'block' } }}>
						{navItems.map((item) => (
							<Button key={item.name} onClick={(e) => {
								handleClickNavItem(e, item.path)
							}} sx={{ color: '#fff' }}>
								{item.name}
							</Button>
						))}
					</Box>
				</Toolbar>
			</AppBar>
			<nav>
				<Drawer
					container={container}
					variant="temporary"
					open={mobileOpen}
					onClose={handleDrawerToggle}
					ModalProps={{
						keepMounted: true,
					}}
					sx={{
						display: { xs: 'block', sm: 'none' },
						'& .MuiDrawer-paper': { boxSizing: 'border-box', width: '80%' },
					}}
				>
					{drawer}
				</Drawer>
			</nav>
		</>
	);
}

export default Navbar;
