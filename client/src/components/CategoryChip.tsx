import React from 'react';
import Chip from '@mui/material/Chip';

interface ColorMap {
	bg: string;
	color: string;
	border: string;
}

const CATEGORY_COLORS: Record<string, ColorMap> = {
	technology: { bg: '#e3f2fd', color: '#1565c0', border: '#90caf9' },
	science: { bg: '#e8f5e9', color: '#2e7d32', border: '#a5d6a7' },
	travel: { bg: '#fff3e0', color: '#e65100', border: '#ffcc80' },
	food: { bg: '#fce4ec', color: '#c62828', border: '#f48fb1' },
	health: { bg: '#f3e5f5', color: '#6a1b9a', border: '#ce93d8' },
	business: { bg: '#e8eaf6', color: '#283593', border: '#9fa8da' },
	lifestyle: { bg: '#e0f7fa', color: '#00695c', border: '#80cbc4' },
	sports: { bg: '#e8f5e9', color: '#1b5e20', border: '#81c784' },
	entertainment: { bg: '#fde8e8', color: '#b71c1c', border: '#ef9a9a' },
};

interface Props {
	category: string;
	size?: 'small' | 'medium';
}

const CategoryChip: React.FC<Props> = ({ category, size = 'small' }) => {
	const colors: ColorMap = CATEGORY_COLORS[category?.toLowerCase()] ?? {
		bg: '#f5f5f5',
		color: '#424242',
		border: '#e0e0e0',
	};

	return (
		<Chip
			label={category}
			size={size}
			sx={{
				backgroundColor: colors.bg,
				color: colors.color,
				border: `1px solid ${colors.border}`,
				fontWeight: 500,
				textTransform: 'capitalize',
			}}
		/>
	);
};

export default CategoryChip;
