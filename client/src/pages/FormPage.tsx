import React, { useEffect, useState } from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Alert from '@mui/material/Alert';
import Divider from '@mui/material/Divider';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { createPost, updatePost, fetchPostById } from '../services/postService';
import { Post, PostFormData } from '../types/post';
import PostForm from '../components/PostForm';
import LoadingSpinner from '../components/LoadingSpinner';

const FormPage: React.FC = () => {
	const { id } = useParams<{ id: string }>();
	const navigate = useNavigate();
	const isEdit = Boolean(id);
	const [existingPost, setExistingPost] = useState<Post | null>(null);
	const [fetchLoading, setFetchLoading] = useState(false);
	const [fetchError, setFetchError] = useState<string | null>(null);
	const [submitLoading, setSubmitLoading] = useState(false);

	useEffect(() => {
		if (isEdit && id) {
			setFetchLoading(true);
			fetchPostById(id)
				.then((res) => setExistingPost(res.data))
				.catch((err: Error) => setFetchError(err.message))
				.finally(() => setFetchLoading(false));
		}
	}, [id, isEdit]);

	const handleSubmit = async (formData: PostFormData) => {
		setSubmitLoading(true);
		try {
			if (isEdit && id) {
				await updatePost(id, formData);
				toast.success('Post updated successfully!');
				navigate(`/view/${id}`);
			} else {
				const response = await createPost(formData);
				toast.success('Post published successfully!');
				navigate(`/view/${response.data.id}`);
			}
		} catch (err) {
			toast.error((err as Error).message || 'Failed to save post');
		} finally {
			setSubmitLoading(false);
		}
	};

	if (isEdit && fetchLoading)
		return <LoadingSpinner message='Loading post data...' />;
	if (isEdit && fetchError)
		return (
			<Container maxWidth='md' sx={{ py: 4 }}>
				<Alert severity='error'>{fetchError}</Alert>
			</Container>
		);

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
				<Typography color='text.primary'>
					{isEdit ? 'Edit Post' : 'New Post'}
				</Typography>
			</Breadcrumbs>

			<Box sx={{ mb: 4 }}>
				<Typography
					variant='h4'
					sx={{
						fontFamily: '"Playfair Display", serif',
						fontWeight: 700,
						color: '#1a1a2e',
						mb: 0.5,
					}}
				>
					{isEdit ? 'Edit Post' : 'Write a New Post'}
				</Typography>
				<Typography variant='body2' color='text.secondary'>
					Fields marked with * are required
				</Typography>
			</Box>

			<Paper
				elevation={0}
				sx={{
					p: { xs: 2.5, sm: 4 },
					border: '1px solid',
					borderColor: 'divider',
					borderRadius: 2,
				}}
			>
				<Box
					sx={{
						height: 3,
						width: 48,
						backgroundColor: '#c84b31',
						borderRadius: 2,
						mb: 3,
					}}
				/>
				<Divider sx={{ mb: 3 }} />
				<PostForm
					defaultValues={existingPost ?? {}}
					onSubmit={handleSubmit}
					isLoading={submitLoading}
					isEdit={isEdit}
				/>
			</Paper>
		</Container>
	);
};

export default FormPage;
