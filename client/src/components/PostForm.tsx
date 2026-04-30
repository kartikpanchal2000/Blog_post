import React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
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
			category: defaultValues.category || '',
			status: defaultValues.status || 'Draft',
		},
	});

	const contentValue = watch('content');

	return (
		<Box component='form' onSubmit={handleSubmit(onSubmit)} noValidate>
			<Grid container spacing={3}>
				<Grid item xs={12}>
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
								label='Post Title'
								fullWidth
								required
								error={!!errors.title}
								helperText={errors.title?.message}
								placeholder='Enter a compelling title...'
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
								label='Author'
								fullWidth
								required
								error={!!errors.author}
								helperText={errors.author?.message}
							/>
						)}
					/>
				</Grid>

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
								label='Content'
								fullWidth
								required
								multiline
								rows={10}
								error={!!errors.content}
								helperText={
									errors.content?.message ||
									`${contentValue?.length || 0} characters`
								}
								placeholder='Write your blog post content here...'
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
