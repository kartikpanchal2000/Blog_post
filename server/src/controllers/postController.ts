import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { Parser } from 'json2csv';
import { postService } from '../services/postService';

export class PostController {
	async createPost(req: Request, res: Response): Promise<void> {
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				res.status(400).json({
					success: false,
					message: 'Validation failed',
					errors: errors.array(),
				});
				return;
			}
			const {
				title,
				content,
				author,
				email,
				category,
				tags,
				status,
				thumbnailUrl,
				shortDescription,
			} = req.body;
			const post = await postService.createPost({
				title,
				content,
				author,
				email,
				category,
				tags,
				status,
				thumbnailUrl,
				shortDescription,
			});
			res.status(201).json({
				success: true,
				message: 'Post created successfully',
				data: post,
			});
		} catch (error) {
			throw error;
		}
	}

	async getAllPosts(req: Request, res: Response): Promise<void> {
		try {
			const { title, author, category, page, limit } = req.query;
			const result = await postService.getAllPosts({
				title: title as string,
				author: author as string,
				category: category as string,
				page: Number(page) || 1,
				limit: Number(limit) || 10,
			});
			res.status(200).json({
				success: true,
				message: 'Posts retrieved successfully',
				data: result.data,
				pagination: {
					total: result.total,
					page: result.page,
					limit: result.limit,
					totalPages: result.totalPages,
				},
			});
		} catch (error) {
			throw error;
		}
	}

	async getPostById(req: Request, res: Response): Promise<void> {
		try {
			const id = String(req.params.id);
			const post = await postService.getPostById(id);
			if (!post) {
				res
					.status(404)
					.json({ success: false, message: `Post with ID ${id} not found` });
				return;
			}
			res.status(200).json({
				success: true,
				message: 'Post retrieved successfully',
				data: post,
			});
		} catch (error) {
			throw error;
		}
	}

	async updatePost(req: Request, res: Response): Promise<void> {
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				res.status(400).json({
					success: false,
					message: 'Validation failed',
					errors: errors.array(),
				});
				return;
			}
			const id = String(req.params.id);
			const {
				title,
				content,
				author,
				email,
				category,
				tags,
				status,
				thumbnailUrl,
				shortDescription,
			} = req.body;
			const updatedPost = await postService.updatePost(id, {
				title,
				content,
				author,
				email,
				category,
				tags,
				status,
				thumbnailUrl,
				shortDescription,
			});
			if (!updatedPost) {
				res
					.status(404)
					.json({ success: false, message: `Post with ID ${id} not found` });
				return;
			}
			res.status(200).json({
				success: true,
				message: 'Post updated successfully',
				data: updatedPost,
			});
		} catch (error) {
			throw error;
		}
	}

	async deletePost(req: Request, res: Response): Promise<void> {
		try {
			const id = String(req.params.id);
			const deleted = await postService.deletePost(id);
			if (!deleted) {
				res
					.status(404)
					.json({ success: false, message: `Post with ID ${id} not found` });
				return;
			}
			res
				.status(200)
				.json({ success: true, message: 'Post deleted successfully' });
		} catch (error) {
			throw error;
		}
	}

	async exportToCSV(req: Request, res: Response): Promise<void> {
		try {
			const { title, author, category } = req.query;
			const posts = await postService.getPostsForExport({
				title: title as string,
				author: author as string,
				category: category as string,
			});
			if (posts.length === 0) {
				res
					.status(404)
					.json({ success: false, message: 'No posts found to export' });
				return;
			}
			const fields = [
				{ label: 'ID', value: 'id' },
				{ label: 'Title', value: 'title' },
				{ label: 'Author', value: 'author' },
				{ label: 'Category', value: 'category' },
				{ label: 'Content', value: 'content' },
				{ label: 'Created At', value: 'createdAt' },
				{ label: 'Updated At', value: 'updatedAt' },
			];
			const parser = new Parser({ fields });
			const csv = parser.parse(posts);
			res.setHeader('Content-Type', 'text/csv');
			res.setHeader(
				'Content-Disposition',
				`attachment; filename="posts-export-${Date.now()}.csv"`,
			);
			res.status(200).send(csv);
		} catch (error) {
			throw error;
		}
	}
}

export const postController = new PostController();
