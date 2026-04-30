import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Box from '@mui/material/Box';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { useNavigate, useLocation } from 'react-router-dom';

const navItems = [
	{ label: 'All Posts', path: '/' },
	{ label: 'New Post', path: '/create' },
];

const Navbar: React.FC = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
	const [drawerOpen, setDrawerOpen] = useState(false);

	const isActive = (path: string) =>
		path === '/'
			? location.pathname === '/'
			: location.pathname.startsWith(path);

	return (
		<>
			<AppBar
				position='sticky'
				elevation={0}
				sx={{
					backgroundColor: '#1a1a2e',
					borderBottom: '1px solid rgba(255,255,255,0.08)',
				}}
			>
				<Toolbar>
					{/* Brand */}
					<Box
						onClick={() => navigate('/')}
						sx={{
							display: 'flex',
							alignItems: 'center',
							gap: 1,
							cursor: 'pointer',
							flexGrow: { xs: 1, sm: 0 },
							mr: { sm: 4 },
						}}
					>
						<Box
							sx={{
								width: 30,
								height: 30,
								backgroundColor: '#c84b31',
								borderRadius: 1,
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center',
							}}
						>
							<Typography
								sx={{
									color: '#fff',
									fontWeight: 800,
									fontSize: '0.7rem',
									letterSpacing: 0,
								}}
							>
								BF
							</Typography>
						</Box>
						<Typography
							variant='h6'
							sx={{
								fontFamily: '"Playfair Display", serif',
								fontWeight: 700,
								color: '#fff',
								letterSpacing: '-0.01em',
							}}
						>
							BlogForge
						</Typography>
					</Box>

					{/* Desktop links */}
					{!isMobile && (
						<Box sx={{ display: 'flex', gap: 0.5, flexGrow: 1 }}>
							{navItems.map((item) => (
								<Button
									key={item.path}
									onClick={() => navigate(item.path)}
									sx={{
										color: isActive(item.path)
											? '#fff'
											: 'rgba(255,255,255,0.65)',
										fontWeight: isActive(item.path) ? 500 : 400,
										borderBottom: isActive(item.path)
											? '2px solid #c84b31'
											: '2px solid transparent',
										borderRadius: 0,
										px: 2,
										py: 1.5,
										'&:hover': {
											color: '#fff',
											background: 'rgba(255,255,255,0.05)',
										},
									}}
								>
									{item.label}
								</Button>
							))}
						</Box>
					)}

					{/* Mobile hamburger — using plain text ☰ instead of icon */}
					{isMobile && (
						<IconButton
							color='inherit'
							edge='end'
							onClick={() => setDrawerOpen(true)}
							sx={{ fontSize: '1.2rem' }}
						>
							☰
						</IconButton>
					)}
				</Toolbar>
			</AppBar>

			{/* Mobile Drawer */}
			<Drawer
				anchor='right'
				open={drawerOpen}
				onClose={() => setDrawerOpen(false)}
				PaperProps={{ sx: { width: 240, backgroundColor: '#1a1a2e' } }}
			>
				<Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 1 }}>
					<IconButton
						onClick={() => setDrawerOpen(false)}
						sx={{ color: 'rgba(255,255,255,0.65)', fontSize: '1rem' }}
					>
						✕
					</IconButton>
				</Box>
				<List>
					{navItems.map((item) => (
						<ListItem key={item.path} disablePadding>
							<ListItemButton
								onClick={() => {
									navigate(item.path);
									setDrawerOpen(false);
								}}
								sx={{
									color: isActive(item.path)
										? '#fff'
										: 'rgba(255,255,255,0.65)',
									backgroundColor: isActive(item.path)
										? 'rgba(200,75,49,0.15)'
										: 'transparent',
									'&:hover': { backgroundColor: 'rgba(255,255,255,0.08)' },
								}}
							>
								<ListItemText primary={item.label} />
							</ListItemButton>
						</ListItem>
					))}
				</List>
			</Drawer>
		</>
	);
};

export default Navbar;
