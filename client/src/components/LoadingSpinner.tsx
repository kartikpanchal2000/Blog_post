import React from 'react';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';

interface Props {
	message?: string;
	minHeight?: number;
}

const LoadingSpinner: React.FC<Props> = ({
	message = 'Loading...',
	minHeight = 400,
}) => (
	<Box
		sx={{
			display: 'flex',
			flexDirection: 'column',
			alignItems: 'center',
			justifyContent: 'center',
			minHeight,
			gap: 2,
		}}
	>
		<CircularProgress size={40} thickness={3} sx={{ color: '#1a1a2e' }} />
		<Typography
			variant='body2'
			sx={{ color: 'text.secondary', fontStyle: 'italic' }}
		>
			{message}
		</Typography>
	</Box>
);

export default LoadingSpinner;
