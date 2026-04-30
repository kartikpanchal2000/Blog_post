import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import theme from './theme';
import Navbar from './components/Navbar';
import AppRoutes from './routes/AppRoutes';

const App: React.FC = () => (
	<ThemeProvider theme={theme}>
		<CssBaseline />
		<BrowserRouter>
			<Box
				sx={{
					minHeight: '100vh',
					backgroundColor: 'background.default',
					display: 'flex',
					flexDirection: 'column',
				}}
			>
				<Navbar />
				<Box component='main' sx={{ flexGrow: 1 }}>
					<AppRoutes />
				</Box>
				<Box
					component='footer'
					sx={{
						py: 3,
						textAlign: 'center',
						borderTop: '1px solid',
						borderColor: 'divider',
					}}
				>
					<Typography
						variant='body2'
						sx={{ color: 'text.secondary', fontSize: '0.8rem' }}
					>
						BlogForge © {new Date().getFullYear()}
					</Typography>
				</Box>
			</Box>
		</BrowserRouter>
		<ToastContainer position='bottom-right' autoClose={3500} theme='light' />
	</ThemeProvider>
);

export default App;
