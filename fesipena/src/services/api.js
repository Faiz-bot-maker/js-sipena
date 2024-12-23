import axios from 'axios';
import { ENDPOINTS } from './endpoints';

const BASE_URL = 'http://localhost:3010'; 

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// Tambahkan interceptor untuk debugging
api.interceptors.request.use(
  config => {
    console.log('Request:', config);
    return config;
  },
  error => {
    console.error('Request Error:', error);
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  response => {
    console.log('Response:', response);
    return response;
  },
  error => {
    console.error('Response Error:', error);
    return Promise.reject(error);
  }
);

export const penelitianAPI = {
  getAll: () => api.get(ENDPOINTS.PENELITIAN.GET_ALL),
  getById: (id) => api.get(ENDPOINTS.PENELITIAN.GET_BY_ID(id)),
  create: (data) => api.post(ENDPOINTS.PENELITIAN.CREATE, data),
  update: (id, data) => api.put(ENDPOINTS.PENELITIAN.UPDATE(id), data),
  delete: (id) => api.delete(ENDPOINTS.PENELITIAN.DELETE(id)),
};

export default api;
