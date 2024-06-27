import axios from 'axios';

const api = axios.create({
  baseURL: 'https://localhost:7182/api/firstapi',
});

export const getUsers = () => api.get('/users');
// TODO: Add more routes

export default api;
