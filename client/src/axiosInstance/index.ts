import axios from 'axios';
import { baseUrl } from './constants';

const axiosInstance = axios.create({
    baseURL: baseUrl,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token') || '',
    }
});

export default axiosInstance;