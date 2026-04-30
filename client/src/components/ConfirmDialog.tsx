import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

interface Props {
	open: boolean;
	title: string;
	message: string;
	onConfirm: () => void;
	onCancel: () => void;
	loading?: boolean;
}

const ConfirmDialog: React.FC<Props> = ({
	open,
	title,
	message,
	onConfirm,
	onCancel,
	loading,
}) => (
	<Dialog
		open={open}
		onClose={onCancel}
		PaperProps={{ sx: { borderRadius: 2, maxWidth: 420, p: 1 } }}
	>
		<DialogTitle sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
			<Box sx={{ fontSize: '1.5rem' }}>⚠️</Box>
			<Typography variant='h6' sx={{ fontFamily: '"Playfair Display", serif' }}>
				{title}
			</Typography>
		</DialogTitle>
		<DialogContent>
			<DialogContentText>{message}</DialogContentText>
		</DialogContent>
		<DialogActions sx={{ px: 3, pb: 2, gap: 1 }}>
			<Button
				onClick={onCancel}
				disabled={loading}
				variant='outlined'
				sx={{ borderColor: 'divider', color: 'text.primary' }}
			>
				Cancel
			</Button>
			<Button
				onClick={onConfirm}
				disabled={loading}
				variant='contained'
				color='error'
				sx={{ minWidth: 100 }}
			>
				{loading ? 'Deleting...' : 'Delete'}
			</Button>
		</DialogActions>
	</Dialog>
);

export default ConfirmDialog;
