import axios from 'axios';
import { baseUrl } from './constants';

const axiosInstance = axios.create({
    baseURL: baseUrl,
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token') || '',
    }
});

export default axiosInstance;