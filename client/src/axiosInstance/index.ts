import axios from 'axios';
import { baseUrl } from './constants';

const axiosInstance = axios.create({
    baseURL: process.env.VITE_API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token') || '',
    }
});

export default axiosInstance;