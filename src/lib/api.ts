import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

// Define response interface
export interface ApiResponse<T> {
    success: boolean;
    message: string;
    data: T;
    code?: string;
    timestamp?: string;
}

// Axios instance
export const instance: AxiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor to add auth token
instance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        console.log(`Request: ${config.method?.toUpperCase()} ${config.url}`);
        return config;
    },
    (error) => {
        console.error('Request error:', error);
        return Promise.reject(error);
    },
);

// Response interceptor
instance.interceptors.response.use(
    (response) => {
        console.log(`Response: ${response.config.url} - Status: ${response.status}`);
        return response;
    },
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem('token');
            console.error('Session expired. Please log in again.');
            window.location.href = '/login';
        } else if (error.response?.status === 429) {
            console.error('Too many requests. Please try again later.');
        } else {
            console.error('Response error:', error.response?.data || error.message);
        }
        return Promise.reject(error);
    },
);

// Enhanced request function
export const request = async <T>(config: AxiosRequestConfig): Promise<T> => {
    try {
        const response: AxiosResponse<ApiResponse<T>> = await instance(config);
        const { success, message, data } = response.data;
        if (success) {
            return data;
        }
        throw new Error(message || 'Request failed');
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const serverMessage = error.response?.data?.message || error.message;
            throw new Error(serverMessage);
        }
        throw error;
    }
};

// HTTP method helpers
export const get = <T>(url: string, config?: AxiosRequestConfig) =>
    request<T>({ ...config, method: 'GET', url });

export const post = <T>(url: string, data?: any, config?: AxiosRequestConfig) =>
    request<T>({ ...config, method: 'POST', url, data });

export const put = <T>(url: string, data?: any, config?: AxiosRequestConfig) =>
    request<T>({ ...config, method: 'PUT', url, data });

export const del = <T>(url: string, config?: AxiosRequestConfig) =>
    request<T>({ ...config, method: 'DELETE', url });