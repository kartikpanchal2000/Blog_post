import { useState, useCallback } from 'react';
import { Post } from '../types/post';
import { fetchPostById } from '../services/postService';

export const usePost = () => {
	const [post, setPost] = useState<Post | null>(null);
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);

	const loadPost = useCallback(async (id: string) => {
		setLoading(true);
		setError(null);
		try {
			const response = await fetchPostById(id);
			setPost(response.data);
		} catch (err) {
			setError((err as Error).message);
		} finally {
			setLoading(false);
		}
	}, []);

	return { post, loading, error, loadPost };
};
