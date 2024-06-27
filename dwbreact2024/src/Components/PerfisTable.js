import React, { useEffect, useState } from 'react';
import { Table, Button, Modal, Form } from 'react-bootstrap';
import api from '../api';

const PerfisTable = () => {
    const [perfis, setPerfis] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [currentPerfilId, setCurrentPerfilId] = useState(null);
    const [perfilForm, setPerfilForm] = useState({
        id_do_Perfil: '',
        id_do_User: '',
        fotografia_do_User: '',
        interesses_de_Viagem: '',
        destinos_Favoritos: '',
        nivel_de_Experiencia_em_Viagens: ''
    });

    useEffect(() => {
        fetchPerfis();
    }, []);

    const fetchPerfis = async () => {
        try {
            const response = await api.get('/perfis');
            setPerfis(response.data);
        } catch (error) {
            console.error('Erro ao buscar perfis:', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await api.delete(`/perfis/${id}`);
            fetchPerfis();
        } catch (error) {
            console.error('Erro ao eliminar perfil:', error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setPerfilForm({ ...perfilForm, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isEditing) {
                await api.put(`/perfis/${currentPerfilId}`, perfilForm);
            } else {
                await api.post('/perfis', perfilForm);
            }
            fetchPerfis();
            setShowModal(false);
        } catch (error) {
            console.error('Erro ao criar ou editar perfil:', error);
        }
    };

    const handleEdit = (perfil) => {
        setCurrentPerfilId(perfil.id_do_Perfil);
        setPerfilForm({
            id_do_Perfil: perfil.id_do_Perfil,
            id_do_User: perfil.id_do_User,
            fotografia_do_User: perfil.fotografia_do_User,
            interesses_de_Viagem: perfil.interesses_de_Viagem,
            destinos_Favoritos: perfil.destinos_Favoritos,
            nivel_de_Experiencia_em_Viagens: perfil.nivel_de_Experiencia_em_Viagens
        });
        setIsEditing(true);
        setShowModal(true);
    };

    return (
        <div>
            <Button variant="primary" onClick={() => { 
                setIsEditing(false); 
                setPerfilForm({ id_do_User: '', fotografia_do_User: '', interesses_de_Viagem: '', destinos_Favoritos: '', nivel_de_Experiencia_em_Viagens: '' }); 
                setShowModal(true); 
            }}>Criar Novo Perfil</Button>
            
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>{isEditing ? 'Editar Perfil' : 'Criar Novo Perfil'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="formUserId">
                            <Form.Label>ID do User</Form.Label>
                            <Form.Control 
                                type="text" 
                                name="id_do_User" 
                                value={perfilForm.id_do_User} 
                                onChange={handleInputChange} 
                                required 
                            />
                        </Form.Group>
                        <Form.Group controlId="formFotografia">
                            <Form.Label>Fotografia do User</Form.Label>
                            <Form.Control 
                                type="text" 
                                name="fotografia_do_User" 
                                value={perfilForm.fotografia_do_User} 
                                onChange={handleInputChange} 
                                required 
                            />
                        </Form.Group>
                        <Form.Group controlId="formInteresses">
                            <Form.Label>Interesses de Viagem</Form.Label>
                            <Form.Control 
                                type="text" 
                                name="interesses_de_Viagem" 
                                value={perfilForm.interesses_de_Viagem} 
                                onChange={handleInputChange} 
                                required 
                            />
                        </Form.Group>
                        <Form.Group controlId="formDestinos">
                            <Form.Label>Destinos Favoritos</Form.Label>
                            <Form.Control 
                                type="text" 
                                name="destinos_Favoritos" 
                                value={perfilForm.destinos_Favoritos} 
                                onChange={handleInputChange} 
                                required 
                            />
                        </Form.Group>
                        <Form.Group controlId="formNivel">
                            <Form.Label>Nível de Experiência em Viagens</Form.Label>
                            <Form.Control 
                                type="text" 
                                name="nivel_de_Experiencia_em_Viagens" 
                                value={perfilForm.nivel_de_Experiencia_em_Viagens} 
                                onChange={handleInputChange} 
                                required 
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            {isEditing ? 'Guardar Alterações' : 'Criar'}
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
            
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>ID do Perfil</th>
                        <th>ID do User</th>
                        <th>Fotografia</th>
                        <th>Interesses</th>
                        <th>Destinos Favoritos</th>
                        <th>Nível de Experiência</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {perfis.map(perfil => (
                        <tr key={perfil.id_do_Perfil}>
                            <td>{perfil.id_do_Perfil}</td>
                            <td>{perfil.id_do_User}</td>
                            <td>{perfil.fotografia_do_User}</td>
                            <td>{perfil.interesses_de_Viagem}</td>
                            <td>{perfil.destinos_Favoritos}</td>
                            <td>{perfil.nivel_de_Experiencia_em_Viagens}</td>
                            <td>
                                <Button variant="warning" onClick={() => handleEdit(perfil)}>Editar</Button>{' '}
                                <Button variant="danger" onClick={() => handleDelete(perfil.id_do_Perfil)}>Apagar</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
};

export default PerfisTable;
