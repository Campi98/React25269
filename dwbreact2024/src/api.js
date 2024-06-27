import axios from 'axios';

const api = axios.create({
  baseURL: 'https://localhost:7182/api/firstapi',
});

export const getUsers = () => api.get('/users');
export const getPerfis = () => api.get('/perfis');
export const getAvaliacoes = () => api.get('/avaliacoes');

export const createUser = (user) => api.post('/users', user);
export const createPerfil = (perfil) => api.post('/perfis', perfil);
export const createAvaliacao = (avaliacao) => api.post('/avaliacoes', avaliacao);

export const updateUser = (id, user) => api.put(`/users/${id}`, user);
export const updatePerfil = (id, perfil) => api.put(`/perfis/${id}`, perfil);
export const updateAvaliacao = (id, avaliacao) => api.put(`/avaliacoes/${id}`, avaliacao);

export const deleteUser = (id) => api.delete(`/users/${id}`);
export const deletePerfil = (id) => api.delete(`/perfis/${id}`);
export const deleteAvaliacao = (id) => api.delete(`/avaliacoes/${id}`);

export default api;
