import { useState, useCallback } from 'react';
import { Post, PaginationInfo, SearchFilters } from '../types/post';
import {
	fetchPosts,
	deletePost as deletePostAPI,
} from '../services/postService';

export const usePosts = () => {
	const [posts, setPosts] = useState<Post[]>([]);
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);
	const [pagination, setPagination] = useState<PaginationInfo>({
		total: 0,
		page: 1,
		limit: 10,
		totalPages: 0,
	});

	const loadPosts = useCallback(async (params: SearchFilters = {}) => {
		setLoading(true);
		setError(null);
		try {
			const response = await fetchPosts(params);
			setPosts(response.data);
			setPagination(response.pagination);
		} catch (err) {
			setError((err as Error).message);
		} finally {
			setLoading(false);
		}
	}, []);

	const removePost = useCallback(
		async (id: string, currentParams: SearchFilters) => {
			await deletePostAPI(id);
			await loadPosts(currentParams);
		},
		[loadPosts],
	);

	return { posts, loading, error, pagination, loadPosts, removePost };
};
