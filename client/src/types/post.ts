export interface Post {
	id: string;
	title: string;
	content: string;
	author: string;
	email?: string;
	category: string;
	tags?: string[];
	status: 'Published' | 'Draft';
	thumbnailUrl?: string;
	shortDescription?: string;
	createdAt: string;
	updatedAt: string;
}

export interface PaginationInfo {
	total: number;
	page: number;
	limit: number;
	totalPages: number;
}

export interface PostsResponse {
	success: boolean;
	message: string;
	data: Post[];
	pagination: PaginationInfo;
}

export interface SinglePostResponse {
	success: boolean;
	message: string;
	data: Post;
}

export interface SearchFilters {
	title?: string;
	author?: string;
	category?: string;
	status?: string;
	page?: number;
	limit?: number;
}

export interface PostFormData {
	title: string;
	content: string;
	author: string;
	email?: string;
	category: string;
	tags?: string;
	status: 'Published' | 'Draft';
	thumbnailUrl?: string;
	shortDescription?: string;
}
