import axios from 'axios';

const api = axios.create({
	baseURL: 'https://blog-post-1iny.onrender.com/api',
});

export default api;
