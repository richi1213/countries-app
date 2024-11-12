import axios, { CreateAxiosDefaults } from 'axios';

const axiosConfig: CreateAxiosDefaults = {
  baseURL: import.meta.env.VITE_COLD_COUNTRIES || '/api',
  responseType: 'json',
};

export const httpClient = axios.create(axiosConfig);
