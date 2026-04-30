import React, { useEffect, useState } from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Alert from '@mui/material/Alert';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { usePost } from '../hooks/usePost';
import { deletePost } from '../services/postService';
import LoadingSpinner from '../components/LoadingSpinner';
import CategoryChip from '../components/CategoryChip';

const ViewPage: React.FC = () => {
	const { id } = useParams<{ id: string }>();
	const navigate = useNavigate();
	const { post, loading, error, loadPost } = usePost();
	const [deleteLoading, setDeleteLoading] = useState(false);

	useEffect(() => {
		if (id) loadPost(id);
	}, [id]);

	const formatDate = (d: string) =>
		new Date(d).toLocaleDateString('en-US', {
			weekday: 'long',
			year: 'numeric',
			month: 'long',
			day: 'numeric',
		});

	const getInitials = (name: string) =>
		name
			?.split(' ')
			.map((n) => n[0])
			.join('')
			.toUpperCase()
			.slice(0, 2) || '?';

	const handleDelete = async () => {
		if (!window.confirm(`Delete "${post?.title}"? Cannot be undone.`)) return;
		setDeleteLoading(true);
		try {
			if (id) await deletePost(id);
			toast.success('Post deleted');
			navigate('/');
		} catch (err) {
			toast.error((err as Error).message || 'Failed to delete');
		} finally {
			setDeleteLoading(false);
		}
	};

	if (loading) return <LoadingSpinner message='Loading post...' />;
	if (error)
		return (
			<Container maxWidth='md' sx={{ py: 4 }}>
				<Alert severity='error'>{error}</Alert>
			</Container>
		);
	if (!post) return null;

	return (
		<Container maxWidth='md' sx={{ py: 4 }}>
			<Breadcrumbs sx={{ mb: 3 }}>
				<Link
					underline='hover'
					sx={{ cursor: 'pointer', color: 'text.secondary' }}
					onClick={() => navigate('/')}
				>
					All Posts
				</Link>
				<Typography color='text.primary' noWrap sx={{ maxWidth: 200 }}>
					{post.title}
				</Typography>
			</Breadcrumbs>

			{/* Action buttons */}
			<Box
				sx={{
					display: 'flex',
					justifyContent: 'space-between',
					alignItems: 'center',
					mb: 3,
					flexWrap: 'wrap',
					gap: 1,
				}}
			>
				<Button
					onClick={() => navigate('/')}
					size='small'
					sx={{ color: 'text.secondary' }}
				>
					← Back
				</Button>
				<Stack direction='row' spacing={1}>
					<Button
						variant='outlined'
						size='small'
						onClick={() => navigate(`/edit/${id}`)}
						sx={{ borderColor: 'divider', color: '#2d7a4f' }}
					>
						✏️ Edit
					</Button>
					<Button
						variant='outlined'
						size='small'
						onClick={handleDelete}
						disabled={deleteLoading}
						sx={{ borderColor: 'divider', color: '#c84b31' }}
					>
						{deleteLoading ? 'Deleting...' : '🗑️ Delete'}
					</Button>
				</Stack>
			</Box>

			{/* Post Card */}
			<Paper
				elevation={0}
				sx={{
					border: '1px solid',
					borderColor: 'divider',
					borderRadius: 2,
					overflow: 'hidden',
				}}
			>
				<Box sx={{ height: 4, backgroundColor: '#1a1a2e' }} />
				<Box sx={{ p: { xs: 2.5, sm: 5 } }}>
					<Box sx={{ mb: 2 }}>
						<CategoryChip category={post.category} size='medium' />
					</Box>

					<Typography
						variant='h3'
						sx={{
							fontFamily: '"Playfair Display", serif',
							fontWeight: 700,
							color: '#1a1a2e',
							lineHeight: 1.25,
							mb: 3,
							fontSize: { xs: '1.75rem', sm: '2.25rem' },
						}}
					>
						{post.title}
					</Typography>

					{/* Author + Date */}
					<Box
						sx={{
							display: 'flex',
							alignItems: 'center',
							gap: 2,
							flexWrap: 'wrap',
							mb: 3,
							pb: 3,
							borderBottom: '1px solid',
							borderColor: 'divider',
						}}
					>
						<Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
							<Avatar
								sx={{
									width: 36,
									height: 36,
									backgroundColor: '#1a1a2e',
									fontSize: '0.8rem',
								}}
							>
								{getInitials(post.author)}
							</Avatar>
							<Box>
								<Typography variant='body2' sx={{ fontWeight: 500 }}>
									{post.author}
								</Typography>
								<Typography variant='caption' color='text.secondary'>
									Author
								</Typography>
							</Box>
						</Box>
						<Typography
							variant='caption'
							color='text.secondary'
							sx={{ ml: 'auto' }}
						>
							🕐 {formatDate(post.createdAt)}
						</Typography>
					</Box>

					{/* Content */}
					<Typography
						variant='body1'
						sx={{
							lineHeight: 1.9,
							fontSize: '1.0625rem',
							whiteSpace: 'pre-wrap',
						}}
					>
						{post.content}
					</Typography>

					<Divider sx={{ mt: 5, mb: 3 }} />

					{/* Meta grid */}
					<Box
						sx={{
							display: 'grid',
							gridTemplateColumns: { xs: '1fr 1fr', sm: 'repeat(4, 1fr)' },
							gap: 2,
						}}
					>
						{[
							{ label: 'Post ID', value: post.id.substring(0, 8) + '...' },
							{ label: 'Category', value: post.category },
							{ label: 'Status', value: post.status || 'Draft' },
							{
								label: 'Created',
								value: new Date(post.createdAt).toLocaleDateString(),
							},
						].map((item) => (
							<Box key={item.label}>
								<Typography
									variant='caption'
									sx={{
										color: 'text.secondary',
										textTransform: 'uppercase',
										letterSpacing: '0.08em',
										fontWeight: 500,
										fontSize: '0.65rem',
									}}
								>
									{item.label}
								</Typography>
								<Typography variant='body2' sx={{ fontWeight: 500, mt: 0.25 }}>
									{item.value}
								</Typography>
							</Box>
						))}
					</Box>
				</Box>
			</Paper>
		</Container>
	);
};

export default ViewPage;
