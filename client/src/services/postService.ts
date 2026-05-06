import apiClient from './apiClient';
import {
	PostsResponse,
	SinglePostResponse,
	PostFormData,
	SearchFilters,
} from '../types/post';

export const fetchPosts = async (
	params: SearchFilters = {},
): Promise<PostsResponse> => {
	const { data } = await apiClient.get<PostsResponse>('/posts', { params });
	return data;
};

export const fetchPostById = async (
	id: string,
): Promise<SinglePostResponse> => {
	const { data } = await apiClient.get<SinglePostResponse>(`/posts/${id}`);
	return data;
};

const transformPostData = (postData: PostFormData | Partial<PostFormData>) => {
	return {
		...postData,
		tags: postData.tags
			? postData.tags
					.toString()
					.split(',')
					.map((t) => t.trim())
					.filter(Boolean)
			: [],
	};
};

export const createPost = async (
	postData: PostFormData,
): Promise<SinglePostResponse> => {
	const { data } = await apiClient.post<SinglePostResponse>(
		'/posts',
		transformPostData(postData),
	);
	return data;
};

export const updatePost = async (
	id: string,
	postData: Partial<PostFormData>,
): Promise<SinglePostResponse> => {
	const { data } = await apiClient.put<SinglePostResponse>(
		`/posts/${id}`,
		transformPostData(postData),
	);
	return data;
};

export const deletePost = async (
	id: string,
): Promise<{ success: boolean; message: string }> => {
	const { data } = await apiClient.delete(`/posts/${id}`);
	return data;
};

export const exportPostsToCSV = async (
	filters: Omit<SearchFilters, 'page' | 'limit'> = {},
): Promise<void> => {
	const response = await apiClient.get('/posts/export/csv', {
		params: filters,
		responseType: 'blob',
	});
	const url = window.URL.createObjectURL(new Blob([response.data as BlobPart]));
	const link = document.createElement('a');
	link.href = url;
	link.setAttribute('download', `posts-export-${Date.now()}.csv`);
	document.body.appendChild(link);
	link.click();
	link.remove();
	window.URL.revokeObjectURL(url);
};
