import axios from 'axios';

const api = axios.create({
  baseURL: 'https://localhost:7182/api/firstapi',
});

export const getUsers = () => api.get('/users');
export const getViagens = () => api.get('/viagens');
// TODO: Add more routes

export default api;
