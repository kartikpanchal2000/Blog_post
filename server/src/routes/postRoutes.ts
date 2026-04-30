import { Router } from 'express';
import { postController } from '../controllers/postController';
import {
	createPostValidation,
	updatePostValidation,
} from '../middleware/validation';
import { asyncHandler } from '../middleware/asyncHandler';

const router = Router();

router.get(
	'/export/csv',
	asyncHandler((req, res) => postController.exportToCSV(req, res)),
);
router.get(
	'/',
	asyncHandler((req, res) => postController.getAllPosts(req, res)),
);
router.post(
	'/',
	createPostValidation,
	asyncHandler((req, res) => postController.createPost(req, res)),
);
router.get(
	'/:id',
	asyncHandler((req, res) => postController.getPostById(req, res)),
);
router.put(
	'/:id',
	updatePostValidation,
	asyncHandler((req, res) => postController.updatePost(req, res)),
);
router.delete(
	'/:id',
	asyncHandler((req, res) => postController.deletePost(req, res)),
);

export default router;
