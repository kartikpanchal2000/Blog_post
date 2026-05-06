import React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import { useForm, Controller } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { PostFormData } from '../types/post';

const CATEGORIES = [
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

interface Props {
	defaultValues?: Partial<PostFormData>;
	onSubmit: (data: PostFormData) => void;
	isLoading: boolean;
	isEdit?: boolean;
}

const SectionTitle: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => (
	<Grid item xs={12}>
		<Typography
			variant='subtitle1'
			fontWeight={600}
			color='text.secondary'
			sx={{ mt: 1 }}
		>
			{children}
		</Typography>
		<Divider sx={{ mt: 0.5 }} />
	</Grid>
);

const PostForm: React.FC<Props> = ({
	defaultValues = {},
	onSubmit,
	isLoading,
	isEdit = false,
}) => {
	const navigate = useNavigate();
	const {
		control,
		handleSubmit,
		formState: { errors },
		watch,
	} = useForm<PostFormData>({
		defaultValues: {
			title: defaultValues.title || '',
			content: defaultValues.content || '',
			author: defaultValues.author || '',
			email: defaultValues.email || '',
			category: defaultValues.category || '',
			tags: defaultValues.tags || '',
			status: defaultValues.status || 'Draft',
			thumbnailUrl: defaultValues.thumbnailUrl || '',
			shortDescription: defaultValues.shortDescription || '',
		},
	});

	const contentValue = watch('content');

	return (
		<Box component='form' onSubmit={handleSubmit(onSubmit)} noValidate>
			<Grid container spacing={3}>
				{/* Basic Information */}
				<SectionTitle>Basic Information</SectionTitle>

				<Grid item xs={12} sm={6}>
					<Controller
						name='title'
						control={control}
						rules={{
							required: 'Title is required',
							minLength: { value: 3, message: 'Min 3 characters' },
						}}
						render={({ field }) => (
							<TextField
								{...field}
								label='Title'
								fullWidth
								required
								error={!!errors.title}
								helperText={errors.title?.message}
								placeholder='Enter post title'
							/>
						)}
					/>
				</Grid>

				<Grid item xs={12} sm={6}>
					<Controller
						name='author'
						control={control}
						rules={{
							required: 'Author is required',
							minLength: { value: 2, message: 'Min 2 characters' },
						}}
						render={({ field }) => (
							<TextField
								{...field}
								label='Author Name'
								fullWidth
								required
								error={!!errors.author}
								helperText={errors.author?.message}
								placeholder='Enter author name'
							/>
						)}
					/>
				</Grid>

				<Grid item xs={12}>
					<Controller
						name='email'
						control={control}
						rules={{
							pattern: {
								value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
								message: 'Enter a valid email address',
							},
						}}
						render={({ field }) => (
							<TextField
								{...field}
								label='Email Address'
								fullWidth
								type='email'
								error={!!errors.email}
								helperText={errors.email?.message}
								placeholder='author@example.com'
							/>
						)}
					/>
				</Grid>

				{/* Classification */}
				<SectionTitle>Classification</SectionTitle>

				<Grid item xs={12} sm={6}>
					<Controller
						name='category'
						control={control}
						rules={{ required: 'Category is required' }}
						render={({ field }) => (
							<TextField
								{...field}
								select
								label='Category'
								fullWidth
								required
								error={!!errors.category}
								helperText={errors.category?.message}
							>
								<MenuItem value='' disabled>
									<em>Select a category</em>
								</MenuItem>
								{CATEGORIES.map((cat) => (
									<MenuItem key={cat} value={cat}>
										{cat}
									</MenuItem>
								))}
							</TextField>
						)}
					/>
				</Grid>

				<Grid item xs={12} sm={6}>
					<Controller
						name='tags'
						control={control}
						render={({ field }) => (
							<TextField
								{...field}
								label='Tags'
								fullWidth
								error={!!errors.tags}
								helperText={errors.tags?.message || 'Separate tags with commas'}
								placeholder='Comma-separated tags'
							/>
						)}
					/>
				</Grid>

				<Grid item xs={12} sm={6}>
					<Controller
						name='status'
						control={control}
						rules={{ required: 'Status is required' }}
						render={({ field }) => (
							<TextField
								{...field}
								select
								label='Status'
								fullWidth
								required
								error={!!errors.status}
								helperText={errors.status?.message}
							>
								<MenuItem value='Draft'>Draft</MenuItem>
								<MenuItem value='Published'>Published</MenuItem>
							</TextField>
						)}
					/>
				</Grid>

				{/* Media */}
				<SectionTitle>Media</SectionTitle>

				<Grid item xs={12}>
					<Controller
						name='thumbnailUrl'
						control={control}
						rules={{
							pattern: {
								value: /^https?:\/\/.+/,
								message: 'Enter a valid URL (starting with http/https)',
							},
						}}
						render={({ field }) => (
							<TextField
								{...field}
								label='Thumbnail URL'
								fullWidth
								error={!!errors.thumbnailUrl}
								helperText={errors.thumbnailUrl?.message}
								placeholder='https://example.com/image.jpg'
							/>
						)}
					/>
				</Grid>

				{/* Content */}
				<SectionTitle>Content</SectionTitle>

				<Grid item xs={12}>
					<Controller
						name='shortDescription'
						control={control}
						rules={{
							maxLength: { value: 500, message: 'Max 500 characters' },
						}}
						render={({ field }) => (
							<TextField
								{...field}
								label='Short Description'
								fullWidth
								multiline
								rows={3}
								error={!!errors.shortDescription}
								helperText={
									errors.shortDescription?.message ||
									'Brief summary of the post'
								}
								placeholder='Brief summary of the post'
							/>
						)}
					/>
				</Grid>

				<Grid item xs={12}>
					<Controller
						name='content'
						control={control}
						rules={{
							required: 'Content is required',
							minLength: { value: 10, message: 'Min 10 characters' },
						}}
						render={({ field }) => (
							<TextField
								{...field}
								label='Post Content'
								fullWidth
								required
								multiline
								rows={10}
								error={!!errors.content}
								helperText={
									errors.content?.message ||
									`${contentValue?.length || 0} characters`
								}
								placeholder='Write your full blog post content here'
							/>
						)}
					/>
				</Grid>
			</Grid>
			<Divider sx={{ my: 3 }} />
			<Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
				<Button
					variant='outlined'
					onClick={() => navigate(-1)}
					disabled={isLoading}
					sx={{ borderColor: 'divider', color: 'text.secondary' }}
				>
					Cancel
				</Button>
				<Button
					type='submit'
					variant='contained'
					disabled={isLoading}
					sx={{ minWidth: 140 }}
				>
					{isLoading
						? isEdit
							? 'Saving...'
							: 'Publishing...'
						: isEdit
							? 'Save Changes'
							: 'Publish Post'}
				</Button>
			</Box>
		</Box>
	);
};

export default PostForm;
