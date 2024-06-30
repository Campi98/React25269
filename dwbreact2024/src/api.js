import axios from 'axios';

const api = axios.create({
  baseURL: 'https://localhost:7182/api',
});

export const getUsers = () => api.get('/users');
export const getPerfis = () => api.get('/perfis');
export const getAvaliacoes = () => api.get('/avaliacoes');
export const getGruposDeViagem = () => api.get('/gruposdeviagem');
export const getMensagens = () => api.get('/mensagens');

export const createUser = (user) => api.post('/users', user);
export const createPerfil = (perfil) => api.post('/perfis', perfil);
export const createAvaliacao = (avaliacao) => api.post('/avaliacoes', avaliacao);
export const createGrupoDeViagem = (grupo) => api.post('/gruposdeviagem', grupo);
export const createMensagem = (mensagem) => api.post('/mensagens', mensagem);

export const updateUser = (id, user) => api.put(`/users/${id}`, user);
export const updatePerfil = (id, perfil) => api.put(`/perfis/${id}`, perfil);
export const updateAvaliacao = (id, avaliacao) => api.put(`/avaliacoes/${id}`, avaliacao);
export const updateGrupoDeViagem = (id, grupo) => api.put(`/gruposdeviagem/${id}`, grupo);
export const updateMensagem = (id, mensagem) => api.put(`/mensagens/${id}`, mensagem);

export const deleteUser = (id) => api.delete(`/users/${id}`);
export const deletePerfil = (id) => api.delete(`/perfis/${id}`);
export const deleteAvaliacao = (id) => api.delete(`/avaliacoes/${id}`);
export const deleteGrupoDeViagem = (id) => api.delete(`/gruposdeviagem/${id}`);
export const deleteMensagem = (id) => api.delete(`/mensagens/${id}`);

// Funções para imagens
export const getImagens = () => api.get('/imagens');
export const saveImage = (image) => api.post('/imagens/saveImagem', { imagem: image });
export const getImagemById = (id) => api.get(`/imagens/${id}`);
export const deleteImage = (id) => api.delete(`/imagens/${id}`);

export default api;
