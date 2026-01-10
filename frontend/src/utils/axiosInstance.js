import axios from 'axios';
import { BASE_URL } from './Apipath';

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: 50000,
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
    },
});

//Request interceptor
axiosInstance.interceptors.request.use(
    (config) => {
        const accessToken = localStorage.getItem('token');

        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

//Response Interceptor
axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.code == 'ECONNABORTED') {
            console.error('Request timeout.Please try again!');
        } else if (error.response) {
            switch (error.response.status) {
                case 401:
                    console.error('Unauthorized: Logging out...');
                    break;
                case 403:
                    console.error(
                        'Forbidden: You do not have access to this resource.'
                    );
                    break;
                case 500:
                    console.error('Internal Server Error.');
                    break;
                default:
                    console.error(
                        `Error ${error.response.status}: ${error.message}`
                    );
            }
        } else {
            // Network error (server down, CORS issues, etc.)
            console.error('Network Error: Please try again later.');
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
