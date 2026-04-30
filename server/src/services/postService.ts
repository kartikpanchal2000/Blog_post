import { AppDataSource } from '../config/data-source';
import { Post } from '../entities/Post';
import { ILike, FindManyOptions } from 'typeorm';

const postRepository = AppDataSource.getRepository(Post);

export interface CreatePostDTO {
	title: string;
	content: string;
	author: string;
	category: string;
	status?: string;
}

export interface UpdatePostDTO {
	title?: string;
	content?: string;
	author?: string;
	category?: string;
	status?: string;
}

export interface SearchFilters {
	title?: string;
	author?: string;
	category?: string;
	status?: string;
	page?: number;
	limit?: number;
}

export interface PaginatedResult {
	data: Post[];
	total: number;
	page: number;
	limit: number;
	totalPages: number;
}

export class PostService {
	async createPost(dto: CreatePostDTO): Promise<Post> {
		const post = postRepository.create(dto);
		return await postRepository.save(post);
	}

	async getAllPosts(filters: SearchFilters): Promise<PaginatedResult> {
		const page = Number(filters.page) || 1;
		const limit = Number(filters.limit) || 10;
		const skip = (page - 1) * limit;

		const whereConditions: any[] = [];

		if (filters.title)
			whereConditions.push({ title: ILike(`%${filters.title}%`) });
		if (filters.author)
			whereConditions.push({ author: ILike(`%${filters.author}%`) });
		if (filters.category)
			whereConditions.push({ category: ILike(`%${filters.category}%`) });
		if (filters.status) whereConditions.push({ status: filters.status });

		const findOptions: FindManyOptions<Post> = {
			where: whereConditions.length > 0 ? whereConditions : undefined,
			order: { createdAt: 'DESC' },
			skip,
			take: limit,
		};

		const [data, total] = await postRepository.findAndCount(findOptions);

		return { data, total, page, limit, totalPages: Math.ceil(total / limit) };
	}

	async getPostById(id: string): Promise<Post | null> {
		return await postRepository.findOne({ where: { id } });
	}

	async updatePost(id: string, dto: UpdatePostDTO): Promise<Post | null> {
		const post = await postRepository.findOne({ where: { id } });
		if (!post) return null;
		Object.assign(post, dto);
		return await postRepository.save(post);
	}

	async deletePost(id: string): Promise<boolean> {
		const post = await postRepository.findOne({ where: { id } });
		if (!post) return false;
		await postRepository.remove(post);
		return true;
	}

	async getPostsForExport(
		filters: Omit<SearchFilters, 'page' | 'limit'>,
	): Promise<Post[]> {
		const whereConditions: any[] = [];
		if (filters.title)
			whereConditions.push({ title: ILike(`%${filters.title}%`) });
		if (filters.author)
			whereConditions.push({ author: ILike(`%${filters.author}%`) });
		if (filters.category)
			whereConditions.push({ category: ILike(`%${filters.category}%`) });
		if (filters.status) whereConditions.push({ status: filters.status });

		return await postRepository.find({
			where: whereConditions.length > 0 ? whereConditions : undefined,
			order: { createdAt: 'DESC' },
		});
	}
}

export const postService = new PostService();
