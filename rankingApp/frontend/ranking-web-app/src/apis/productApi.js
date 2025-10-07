// apis/productApi.js
import AxiosService from '../utils/baseApi';

const api = new AxiosService('https://api.restful-api.dev/');

export const getProducts = () => api.get('/objects');

export const getProductById = (id) => api.get(`/objects/${id}`);

export const createProduct = (product) => api.post('/objects', product);

export const updateProduct = (id, updatedProduct) => api.put(`/objects/${id}`, updatedProduct);

export const deleteProduct = (id) => api.delete(`/objects/${id}`);
