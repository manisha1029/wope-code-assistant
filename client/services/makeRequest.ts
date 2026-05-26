import axios, { AxiosError, AxiosResponse } from 'axios';

const BaseUrl = process.env.NEXT_PUBLIC_API_URL;

const api = axios.create({
    baseURL: BaseUrl,
    withCredentials: true,
    headers: { 'Content-Type': 'application/json' }
});

// Request Interceptors
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('jwt_token');
        if (token) config.headers.Authorization = `Bearer ${token}`;
        return config;
    },
    (error) => Promise.reject(error)
);

api.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
        if (error.response?.status === 401) {
            localStorage.removeItem('jwt_token');
            window.location.href = "/";
        }
        return Promise.reject(error);
    }
);

// Types
type Success<T> = { ok: true;  data: T;      status: number; }
type Failure    = { ok: false; error: string; status: number; }
export type ApiResponse<T> = Success<T> | Failure;

// Handler
const handleRequest = async <T>(
    request: Promise<AxiosResponse<T>>
): Promise<ApiResponse<T>> => {
    try {
        const response = await request;
        return { ok: true, data: response.data, status: response.status };
    } catch (err) {
        const e = err as AxiosError<{ detail: string }>;
        return {
            ok: false,
            error: e.response?.data?.detail || 'Something went wrong',
            status: e.response?.status || 500
        };
    }
};

// Methods
export const get = <T>(url: string) =>
    handleRequest<T>(api.get<T>(url));

export const post = <T>(url: string, data?: unknown) =>
    handleRequest<T>(api.post<T>(url, data));

export const put = <T>(url: string, data?: unknown) =>
    handleRequest<T>(api.put<T>(url, data));

export const del = <T>(url: string) =>
    handleRequest<T>(api.delete<T>(url));

export default api;