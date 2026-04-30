import React, { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';
import Chip from '@mui/material/Chip';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useNavigate } from 'react-router-dom';
import { Post } from '../types/post';
import CategoryChip from './CategoryChip';

interface Props {
	posts: Post[];
	loading: boolean;
	onDeleteClick: (post: Post) => void;
	currentPage: number;
	limit: number;
}

const StatusBadge: React.FC<{ status: string }> = ({ status }) => {
	const isPublished = status === 'Published';
	return (
		<Chip
			label={status}
			size='small'
			sx={{
				backgroundColor: isPublished ? '#e8f5e9' : '#fff3e0',
				color: isPublished ? '#2e7d32' : '#e65100',
				border: `1px solid ${isPublished ? '#a5d6a7' : '#ffcc80'}`,
				fontWeight: 500,
				fontSize: '0.72rem',
				height: 24,
			}}
		/>
	);
};

const ActionMenu: React.FC<{
	onView: () => void;
	onEdit: () => void;
	onDelete: () => void;
}> = ({ onView, onEdit, onDelete }) => {
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);

	const handleOpen = (e: React.MouseEvent<HTMLElement>) => {
		e.stopPropagation();
		setAnchorEl(e.currentTarget);
	};
	const handleClose = () => setAnchorEl(null);

	return (
		<>
			<IconButton
				size='small'
				onClick={handleOpen}
				sx={{ color: 'text.secondary', fontSize: '1.1rem' }}
			>
				⋮
			</IconButton>
			<Menu
				anchorEl={anchorEl}
				open={open}
				onClose={handleClose}
				PaperProps={{
					sx: {
						boxShadow: '0 4px 20px rgba(0,0,0,0.12)',
						borderRadius: 2,
						minWidth: 150,
					},
				}}
				transformOrigin={{ horizontal: 'right', vertical: 'top' }}
				anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
			>
				<MenuItem
					onClick={() => {
						onView();
						handleClose();
					}}
				>
					<Box sx={{ mr: 1.5, fontSize: '0.9rem' }}>👁</Box>
					<Typography variant='body2'>View</Typography>
				</MenuItem>
				<MenuItem
					onClick={() => {
						onEdit();
						handleClose();
					}}
				>
					<Box sx={{ mr: 1.5, fontSize: '0.9rem' }}>✏️</Box>
					<Typography variant='body2'>Edit</Typography>
				</MenuItem>
				<MenuItem
					onClick={() => {
						onDelete();
						handleClose();
					}}
				>
					<Box sx={{ mr: 1.5, fontSize: '0.9rem' }}>🗑️</Box>
					<Typography variant='body2' sx={{ color: '#c84b31' }}>
						Delete
					</Typography>
				</MenuItem>
			</Menu>
		</>
	);
};

const PostsTable: React.FC<Props> = ({
	posts,
	loading,
	onDeleteClick,
	currentPage,
	limit,
}) => {
	const navigate = useNavigate();

	const formatDate = (d: string) =>
		new Date(d).toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'short',
			day: 'numeric',
		});

	const getRowNumber = (index: number) => (currentPage - 1) * limit + index + 1;

	if (loading) {
		return (
			<TableContainer
				component={Paper}
				elevation={0}
				sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 2 }}
			>
				<Table>
					<TableHead>
						<TableRow>
							{[
								'ID',
								'Title',
								'Author',
								'Category',
								'Status',
								'Created',
								'Action',
							].map((h) => (
								<TableCell key={h}>{h}</TableCell>
							))}
						</TableRow>
					</TableHead>
					<TableBody>
						{Array.from({ length: 5 }).map((_, i) => (
							<TableRow key={i}>
								{Array.from({ length: 7 }).map((_, j) => (
									<TableCell key={j}>
										<Skeleton variant='text' />
									</TableCell>
								))}
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		);
	}

	if (posts.length === 0) {
		return (
			<Paper
				elevation={0}
				sx={{
					border: '1px solid',
					borderColor: 'divider',
					borderRadius: 2,
					p: 8,
					textAlign: 'center',
				}}
			>
				<Typography
					variant='h5'
					sx={{
						fontFamily: '"Playfair Display", serif',
						color: 'text.secondary',
						mb: 1,
					}}
				>
					No posts found
				</Typography>
				<Typography variant='body2' color='text.secondary'>
					Try adjusting your search or create a new post.
				</Typography>
			</Paper>
		);
	}

	return (
		<TableContainer
			component={Paper}
			elevation={0}
			sx={{
				border: '1px solid',
				borderColor: 'divider',
				borderRadius: 2,
				overflow: 'hidden',
			}}
		>
			<Table sx={{ minWidth: 700 }}>
				<TableHead>
					<TableRow>
						<TableCell sx={{ width: 60 }}>ID</TableCell>
						<TableCell>Title</TableCell>
						<TableCell>Author</TableCell>
						<TableCell>Category</TableCell>
						<TableCell>Status</TableCell>
						<TableCell>Created</TableCell>
						<TableCell align='center'>Action</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{posts.map((post, index) => (
						<TableRow
							key={post.id}
							sx={{
								'&:last-child td': { border: 0 },
								'&:hover': { backgroundColor: '#fafafa' },
							}}
						>
							<TableCell>
								<Typography
									variant='body2'
									sx={{ color: 'text.secondary', fontWeight: 500 }}
								>
									{getRowNumber(index)}
								</Typography>
							</TableCell>
							<TableCell>
								<Typography
									variant='body2'
									sx={{
										fontWeight: 600,
										cursor: 'pointer',
										'&:hover': { color: '#c84b31' },
										maxWidth: 220,
									}}
									onClick={() => navigate(`/view/${post.id}`)}
								>
									{post.title}
								</Typography>
							</TableCell>
							<TableCell>
								<Typography variant='body2' color='text.secondary'>
									{post.author}
								</Typography>
							</TableCell>
							<TableCell>
								<CategoryChip category={post.category} />
							</TableCell>
							<TableCell>
								<StatusBadge status={post.status || 'Draft'} />
							</TableCell>
							<TableCell>
								<Typography
									variant='body2'
									color='text.secondary'
									sx={{ whiteSpace: 'nowrap' }}
								>
									{formatDate(post.createdAt)}
								</Typography>
							</TableCell>
							<TableCell align='center'>
								<ActionMenu
									onView={() => navigate(`/view/${post.id}`)}
									onEdit={() => navigate(`/edit/${post.id}`)}
									onDelete={() => onDeleteClick(post)}
								/>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
};

export default PostsTable;
