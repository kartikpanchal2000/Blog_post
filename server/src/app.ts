import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { AppDataSource } from './config/data-source';
import postRoutes from './routes/postRoutes';
import { errorHandler, notFoundHandler } from './middleware/errorHandler';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(
	cors({
		//origin: process.env.CLIENT_URL || 'http://localhost:5173',
		origin: true,
		methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
		allowedHeaders: ['Content-Type', 'Authorization'],
	}),
);

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

app.use('/api/posts', postRoutes);

app.get('/api/health', (req, res) => {
	res.json({
		success: true,
		message: 'API is running',
		timestamp: new Date().toISOString(),
	});
});

app.use(notFoundHandler);
app.use(errorHandler);

const startServer = async () => {
	try {
		await AppDataSource.initialize();
		console.log('✅ Database connected successfully');
		app.listen(PORT, () => {
			console.log(`🚀 Server running on http://localhost:${PORT}`);
		});
	} catch (error) {
		console.error(' Failed to connect to database:', error);
		process.exit(1);
	}
};

startServer();

export default app;
