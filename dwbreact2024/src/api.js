import axios from 'axios';

const api = axios.create({
  baseURL: 'https://localhost:7182/api/firstapi',
});

export const getUsers = () => api.get('/users');
export const getPerfis = () => api.get('/perfis');
export const getAvaliacoes = () => api.get('/avaliacoes');
export const getGruposDeViagem = () => api.get('/grupos_de_viagem');
export const getMensagens = () => api.get('/mensagens');

export const createUser = (user) => api.post('/users', user);
export const createPerfil = (perfil) => api.post('/perfis', perfil);
export const createAvaliacao = (avaliacao) => api.post('/avaliacoes', avaliacao);
export const createGrupoDeViagem = (grupo) => api.post('/grupos_de_viagem', grupo);
export const createMensagem = (mensagem) => api.post('/mensagens', mensagem);

export const updateUser = (id, user) => api.put(`/users/${id}`, user);
export const updatePerfil = (id, perfil) => api.put(`/perfis/${id}`, perfil);
export const updateAvaliacao = (id, avaliacao) => api.put(`/avaliacoes/${id}`, avaliacao);
export const updateGrupoDeViagem = (id, grupo) => api.put(`/grupos_de_viagem/${id}`, grupo);
export const updateMensagem = (id, mensagem) => api.put(`/mensagens/${id}`, mensagem);

export const deleteUser = (id) => api.delete(`/users/${id}`);
export const deletePerfil = (id) => api.delete(`/perfis/${id}`);
export const deleteAvaliacao = (id) => api.delete(`/avaliacoes/${id}`);
export const deleteGrupoDeViagem = (id) => api.delete(`/grupos_de_viagem/${id}`);
export const deleteMensagem = (id) => api.delete(`/mensagens/${id}`);

export default api;
