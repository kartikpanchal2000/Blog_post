import axios, { AxiosError } from 'axios';

const apiClient = axios.create({
	baseURL: import.meta.env.VITE_API_URL,
	headers: { 'Content-Type': 'application/json' },
	timeout: 10000,
});

apiClient.interceptors.response.use(
	(response) => response,
	(error: AxiosError<{ message?: string; errors?: { msg: string }[] }>) => {
		const message =
			error.response?.data?.message ||
			error.response?.data?.errors?.[0]?.msg ||
			error.message ||
			'An unexpected error occurred';
		return Promise.reject(new Error(message));
	},
);

export default apiClient;
