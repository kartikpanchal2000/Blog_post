import { body } from 'express-validator';

export const createPostValidation = [
	body('title')
		.trim()
		.notEmpty()
		.withMessage('Title is required')
		.isLength({ min: 3, max: 255 })
		.withMessage('Title must be 3–255 characters'),
	body('content')
		.trim()
		.notEmpty()
		.withMessage('Content is required')
		.isLength({ min: 10 })
		.withMessage('Content must be at least 10 characters'),
	body('author')
		.trim()
		.notEmpty()
		.withMessage('Author is required')
		.isLength({ min: 2, max: 100 })
		.withMessage('Author must be 2–100 characters'),
	body('email')
		.optional()
		.trim()
		.isEmail()
		.withMessage('Email must be a valid email address')
		.isLength({ max: 255 })
		.withMessage('Email must be at most 255 characters'),
	body('category')
		.trim()
		.notEmpty()
		.withMessage('Category is required')
		.isLength({ min: 2, max: 100 })
		.withMessage('Category must be 2–100 characters'),
	body('tags')
		.optional()
		.isArray()
		.withMessage('Tags must be an array of strings'),
	body('tags.*')
		.optional()
		.trim()
		.isString()
		.withMessage('Each tag must be a string'),
	body('status')
		.trim()
		.notEmpty()
		.withMessage('Status is required')
		.isIn(['Draft', 'Published'])
		.withMessage('Status must be Draft or Published'),
	body('thumbnailUrl')
		.optional()
		.trim()
		.isURL()
		.withMessage('Thumbnail URL must be a valid URL'),
	body('shortDescription')
		.optional()
		.trim()
		.isLength({ max: 500 })
		.withMessage('Short description must be at most 500 characters'),
];

export const updatePostValidation = [
	body('title')
		.optional()
		.trim()
		.isLength({ min: 3, max: 255 })
		.withMessage('Title must be 3–255 characters'),
	body('content')
		.optional()
		.trim()
		.isLength({ min: 10 })
		.withMessage('Content must be at least 10 characters'),
	body('author')
		.optional()
		.trim()
		.isLength({ min: 2, max: 100 })
		.withMessage('Author must be 2–100 characters'),
	body('email')
		.optional()
		.trim()
		.isEmail()
		.withMessage('Email must be a valid email address'),
	body('category')
		.optional()
		.trim()
		.isLength({ min: 2, max: 100 })
		.withMessage('Category must be 2–100 characters'),
	body('tags')
		.optional()
		.isArray()
		.withMessage('Tags must be an array of strings'),
	body('tags.*')
		.optional()
		.trim()
		.isString()
		.withMessage('Each tag must be a string'),
	body('status')
		.optional()
		.trim()
		.isIn(['Draft', 'Published'])
		.withMessage('Status must be Draft or Published'),
	body('thumbnailUrl')
		.optional()
		.trim()
		.isURL()
		.withMessage('Thumbnail URL must be a valid URL'),
	body('shortDescription')
		.optional()
		.trim()
		.isLength({ max: 500 })
		.withMessage('Short description must be at most 500 characters'),
];
