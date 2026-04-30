import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Collapse from '@mui/material/Collapse';
import InputAdornment from '@mui/material/InputAdornment';
import Typography from '@mui/material/Typography';
import { SearchFilters } from '../types/post';

interface Props {
	onSearch: (filters: SearchFilters) => void;
	onClear: () => void;
}

const SearchBar: React.FC<Props> = ({ onSearch, onClear }) => {
	const [title, setTitle] = useState('');
	const [author, setAuthor] = useState('');
	const [category, setCategory] = useState('');
	const [showAdvanced, setShowAdvanced] = useState(false);

	const handleSearch = () => onSearch({ title, author, category });
	const handleClear = () => {
		setTitle('');
		setAuthor('');
		setCategory('');
		onClear();
	};
	const handleKeyDown = (e: React.KeyboardEvent) => {
		if (e.key === 'Enter') handleSearch();
	};
	const hasFilters = title || author || category;

	return (
		<Box sx={{ mb: 3 }}>
			<Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
				<TextField
					fullWidth
					size='small'
					placeholder='Search by title...'
					value={title}
					onChange={(e) => setTitle(e.target.value)}
					onKeyDown={handleKeyDown}
					InputProps={{
						startAdornment: (
							<InputAdornment position='start'>
								<Typography
									sx={{ fontSize: '0.9rem', color: 'text.secondary' }}
								>
									🔍
								</Typography>
							</InputAdornment>
						),
					}}
				/>
				<Button
					variant='outlined'
					size='small'
					onClick={() => setShowAdvanced(!showAdvanced)}
					sx={{
						whiteSpace: 'nowrap',
						borderColor: 'divider',
						color: 'text.secondary',
					}}
				>
					Filters
				</Button>
				<Button
					variant='contained'
					size='small'
					onClick={handleSearch}
					sx={{ whiteSpace: 'nowrap' }}
				>
					Search
				</Button>
				{hasFilters && (
					<Button
						size='small'
						onClick={handleClear}
						sx={{ whiteSpace: 'nowrap', color: 'text.secondary' }}
					>
						Clear
					</Button>
				)}
			</Box>
			<Collapse in={showAdvanced}>
				<Grid container spacing={1} sx={{ mt: 0.5 }}>
					<Grid item xs={12} sm={6}>
						<TextField
							fullWidth
							size='small'
							label='Author'
							value={author}
							onChange={(e) => setAuthor(e.target.value)}
							onKeyDown={handleKeyDown}
						/>
					</Grid>
					<Grid item xs={12} sm={6}>
						<TextField
							fullWidth
							size='small'
							label='Category'
							value={category}
							onChange={(e) => setCategory(e.target.value)}
							onKeyDown={handleKeyDown}
						/>
					</Grid>
				</Grid>
			</Collapse>
		</Box>
	);
};

export default SearchBar;
