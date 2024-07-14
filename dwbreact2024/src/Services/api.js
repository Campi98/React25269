import axios from 'axios';

const api = axios.create({
  baseURL: 'https://localhost:7070/api',
  withCredentials: true,
});

// Alojamentos
export const getAlojamentos = () => api.get('/alojamentos');
export const createAlojamento = (alojamento) => api.post('/alojamentos', alojamento);
export const updateAlojamento = (id, alojamento) => api.put(`/alojamentos/${id}`, alojamento);
export const deleteAlojamento = (id) => api.delete(`/alojamentos/${id}`);

// Avaliações
export const getAvaliacoes = () => api.get('/avaliacoes');
export const createAvaliacao = (avaliacao) => api.post('/avaliacoes', avaliacao);
export const updateAvaliacao = (id, avaliacao) => api.put(`/avaliacoes/${id}`, avaliacao);
export const deleteAvaliacao = (id) => api.delete(`/avaliacoes/${id}`);

// GruposDeViagem
export const getGruposDeViagem = () => api.get('/Grupo_de_Viagem');
export const createGrupoDeViagem = (grupoDeViagem) => api.post('/Grupo_de_Viagem', grupoDeViagem);
export const updateGrupoDeViagem = (id, grupoDeViagem) => api.put(`/Grupo_de_Viagem/${id}`, grupoDeViagem);
export const deleteGrupoDeViagem = (id) => api.delete(`/Grupo_de_Viagem/${id}`);

// Imagens
export const getImagens = () => api.get('/imagens');
export const saveImage = (image) => api.post('/imagens/saveImagem', { imagem: image });
export const getImagemById = (id) => api.get(`/imagens/${id}`);
export const deleteImage = (id) => api.delete(`/imagens/${id}`);

// Mensagens
export const getMensagens = () => api.get('/mensagens');
export const createMensagem = (mensagem) => api.post('/mensagens', mensagem);
export const updateMensagem = (id, mensagem) => api.put(`/mensagens/${id}`, mensagem);
export const deleteMensagem = (id) => api.delete(`/mensagens/${id}`);

// Perfis
export const getPerfis = () => api.get('/perfis');
export const createPerfil = (perfil) => api.post('/perfis', perfil);
export const updatePerfil = (id, perfil) => api.put(`/perfis/${id}`, perfil);
export const deletePerfil = (id) => api.delete(`/perfis/${id}`);

// novo
export const getUserProfile = (id) => api.get(`/perfis/${id}`);  

// Users
export const getUsers = () => api.get('/users');
export const createUser = (user) => api.post('/users', user);
export const updateUser = (id, user) => api.put(`/users/${id}`, user);
export const deleteUser = (id) => api.delete(`/users/${id}`);

// Viagens
export const getViagens = () => api.get('/viagens');
export const createViagem = (viagem) => api.post('/viagens', viagem);
export const updateViagem = (id, viagem) => api.put(`/viagens/${id}`, viagem);
export const deleteViagem = (id) => api.delete(`/viagens/${id}`);
export const getViagensByDestino = (nome) => api.get(`/viagens/name/${nome}`);


// Authentication
export const loginUser = (user) => api.post('/account/login', user);
export const registerUser = (user) => api.post('/account/register', user);
export const logoutUser = () => api.post('/account/logout');
export const checkAuthStatus = () => api.get('/account/status');




// ViagemGrupos
export const getViagemGrupos = () => api.get('/viagemgruposreact');
export const createViagemGrupo = (viagemGrupo) => api.post('/viagemgruposreact', viagemGrupo);
export const updateViagemGrupo = (viagemId, grupoDeViagemId, viagemGrupo) => api.put(`/viagemgruposreact/${viagemId}/${grupoDeViagemId}`, viagemGrupo);
export const deleteViagemGrupo = (viagemId, grupoDeViagemId) => api.delete(`/viagemgruposreact/${viagemId}/${grupoDeViagemId}`);


export default api;
