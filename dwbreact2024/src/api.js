import axios from 'axios';

const api = axios.create({
  baseURL: 'https://localhost:7182/api/firstapi',
});

export const getUsers = () => api.get('/users');
export const getPerfis = () => api.get('/perfis');
export const createUser = (user) => api.post('/users', user);
export const createPerfil = (perfil) => api.post('/perfis', perfil);
export const updateUser = (id, user) => api.put(`/users/${id}`, user);
export const updatePerfil = (id, perfil) => api.put(`/perfis/${id}`, perfil);
export const deleteUser = (id) => api.delete(`/users/${id}`);
export const deletePerfil = (id) => api.delete(`/perfis/${id}`);

export default api;
