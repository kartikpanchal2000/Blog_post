import { createTheme } from '@mui/material/styles';

const theme = createTheme({
	palette: {
		primary: { main: '#1a1a2e', contrastText: '#ffffff' },
		secondary: { main: '#c84b31', contrastText: '#ffffff' },
		background: { default: '#f8f5f0', paper: '#ffffff' },
		text: { primary: '#1a1a2e', secondary: '#5a5a7a' },
		divider: '#e8e4df',
	},
	typography: {
		fontFamily: '"DM Sans", sans-serif',
		h1: { fontFamily: '"Playfair Display", serif', fontWeight: 700 },
		h2: { fontFamily: '"Playfair Display", serif', fontWeight: 700 },
		h3: { fontFamily: '"Playfair Display", serif', fontWeight: 600 },
		h4: { fontFamily: '"Playfair Display", serif', fontWeight: 600 },
		h5: { fontFamily: '"Playfair Display", serif', fontWeight: 600 },
		h6: { fontFamily: '"Playfair Display", serif', fontWeight: 600 },
		button: { textTransform: 'none' as const, fontWeight: 500 },
	},
	components: {
		MuiButton: {
			styleOverrides: {
				root: { borderRadius: 4, padding: '8px 20px' },
			},
		},
		MuiTableHead: {
			styleOverrides: {
				root: {
					'& .MuiTableCell-head': {
						backgroundColor: '#1a1a2e',
						color: '#ffffff',
						fontWeight: 500,
						textTransform: 'uppercase' as const,
						fontSize: '0.75rem',
						letterSpacing: '0.06em',
					},
				},
			},
		},
	},
});

export default theme;
