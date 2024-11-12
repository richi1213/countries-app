import axios, { AxiosRequestConfig } from 'axios';

const axiosConfig: AxiosRequestConfig = {
  baseURL: import.meta.env.VITE_COLD_COUNTRIES || '/api',
  responseType: 'json',
};

export const httpClient = axios.create(axiosConfig);
