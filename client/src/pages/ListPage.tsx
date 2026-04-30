import React, { useEffect, useState } from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Pagination from '@mui/material/Pagination';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import InputAdornment from '@mui/material/InputAdornment';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { usePosts } from '../hooks/usePosts';
import { exportPostsToCSV } from '../services/postService';
import { Post, SearchFilters } from '../types/post';
import PostsTable from '../components/PostsTable';
import ConfirmDialog from '../components/ConfirmDialog';

const CATEGORIES = [
	'All Categories',
	'Technology',
	'Science',
	'Travel',
	'Food',
	'Health',
	'Business',
	'Lifestyle',
	'Politics',
	'Sports',
	'Entertainment',
	'Other',
];
const STATUSES = ['All Status', 'Published', 'Draft'];
const LIMIT = 5;

const ListPage: React.FC = () => {
	const navigate = useNavigate();
	const { posts, loading, error, pagination, loadPosts, removePost } =
		usePosts();
	const [searchText, setSearchText] = useState('');
	const [selectedCategory, setSelectedCategory] = useState('All Categories');
	const [selectedStatus, setSelectedStatus] = useState('All Status');
	const [deleteTarget, setDeleteTarget] = useState<Post | null>(null);
	const [deleteLoading, setDeleteLoading] = useState(false);
	const [exportLoading, setExportLoading] = useState(false);
	const [currentPage, setCurrentPage] = useState(1);

	const buildFilters = (): SearchFilters => ({
		title: searchText || undefined,
		category:
			selectedCategory !== 'All Categories' ? selectedCategory : undefined,
		status: selectedStatus !== 'All Status' ? selectedStatus : undefined,
		page: currentPage,
		limit: LIMIT,
	});

	useEffect(() => {
		loadPosts(buildFilters());
	}, [searchText, selectedCategory, selectedStatus, currentPage]);

	const handlePageChange = (_: React.ChangeEvent<unknown>, page: number) => {
		setCurrentPage(page);
		window.scrollTo({ top: 0, behavior: 'smooth' });
	};

	const handleDeleteConfirm = async () => {
		if (!deleteTarget) return;
		setDeleteLoading(true);
		try {
			await removePost(deleteTarget.id, buildFilters());
			toast.success(`"${deleteTarget.title}" deleted`);
			setDeleteTarget(null);
		} catch (err) {
			toast.error((err as Error).message || 'Failed to delete');
		} finally {
			setDeleteLoading(false);
		}
	};

	const handleExportCSV = async () => {
		setExportLoading(true);
		try {
			await exportPostsToCSV({ title: searchText || undefined });
			toast.success('Posts exported!');
		} catch (err) {
			toast.error((err as Error).message || 'Export failed');
		} finally {
			setExportLoading(false);
		}
	};

	return (
		<Container maxWidth='lg' sx={{ py: 4 }}>
			{/* Header */}
			<Box
				sx={{
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'space-between',
					mb: 1,
					flexWrap: 'wrap',
					gap: 2,
				}}
			>
				<Box>
					<Typography
						variant='h5'
						sx={{
							fontFamily: '"Playfair Display", serif',
							fontWeight: 700,
							color: '#1a1a2e',
						}}
					>
						Blog Post Manager
					</Typography>
					<Typography variant='body2' color='text.secondary'>
						Manage and organize your blog posts
					</Typography>
				</Box>
				<Stack direction='row' spacing={1.5}>
					<Button
						variant='outlined'
						onClick={handleExportCSV}
						disabled={exportLoading || posts.length === 0}
						size='small'
						sx={{ borderColor: 'divider', color: 'text.secondary' }}
					>
						{exportLoading ? 'Exporting...' : '⬇ Export CSV'}
					</Button>
					<Button
						variant='contained'
						onClick={() => navigate('/create')}
						size='small'
						sx={{
							backgroundColor: '#6c5ce7',
							'&:hover': { backgroundColor: '#5a4dd1' },
						}}
					>
						+ Add Post
					</Button>
				</Stack>
			</Box>

			<Divider sx={{ mb: 3, mt: 2 }} />

			{/* Search + Filter Row */}
			<Box sx={{ display: 'flex', gap: 2, mb: 3, flexWrap: 'wrap' }}>
				<TextField
					size='small'
					placeholder='Search posts...'
					value={searchText}
					onChange={(e) => {
						setSearchText(e.target.value);
						setCurrentPage(1);
					}}
					sx={{ flexGrow: 1, minWidth: 200 }}
					InputProps={{
						startAdornment: (
							<InputAdornment position='start'>
								<Typography sx={{ fontSize: '0.85rem' }}>🔍</Typography>
							</InputAdornment>
						),
					}}
				/>
				<TextField
					select
					size='small'
					value={selectedCategory}
					onChange={(e) => {
						setSelectedCategory(e.target.value);
						setCurrentPage(1);
					}}
					sx={{ minWidth: 160 }}
				>
					{CATEGORIES.map((c) => (
						<MenuItem key={c} value={c}>
							{c}
						</MenuItem>
					))}
				</TextField>
				<TextField
					select
					size='small'
					value={selectedStatus}
					onChange={(e) => {
						setSelectedStatus(e.target.value);
						setCurrentPage(1);
					}}
					sx={{ minWidth: 130 }}
				>
					{STATUSES.map((s) => (
						<MenuItem key={s} value={s}>
							{s}
						</MenuItem>
					))}
				</TextField>
			</Box>

			{error && (
				<Alert severity='error' sx={{ mb: 3 }}>
					{error}
				</Alert>
			)}

			{/* Table */}
			<PostsTable
				posts={posts}
				loading={loading}
				onDeleteClick={setDeleteTarget}
				currentPage={currentPage}
				limit={LIMIT}
			/>

			{/* Pagination */}
			{!loading && pagination.total > 0 && (
				<Box
					sx={{
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'space-between',
						mt: 2,
						flexWrap: 'wrap',
						gap: 1,
					}}
				>
					<Typography variant='body2' color='text.secondary'>
						Showing {(currentPage - 1) * LIMIT + 1} to{' '}
						{Math.min(currentPage * LIMIT, pagination.total)} of{' '}
						{pagination.total} records
					</Typography>
					{pagination.totalPages > 1 && (
						<Pagination
							count={pagination.totalPages}
							page={currentPage}
							onChange={handlePageChange}
							size='small'
							shape='rounded'
							sx={{
								'& .Mui-selected': {
									backgroundColor: '#1a1a2e !important',
									color: '#fff',
								},
							}}
						/>
					)}
				</Box>
			)}

			{/* Delete Confirm */}
			<ConfirmDialog
				open={!!deleteTarget}
				title='Delete Post'
				message={
					deleteTarget
						? `Delete "${deleteTarget.title}"? This cannot be undone.`
						: ''
				}
				onConfirm={handleDeleteConfirm}
				onCancel={() => setDeleteTarget(null)}
				loading={deleteLoading}
			/>
		</Container>
	);
};

export default ListPage;
