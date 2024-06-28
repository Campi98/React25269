import React, { useEffect, useState } from 'react';
import { Table, Button, Modal, Form } from 'react-bootstrap';
import api, { getMensagens } from '../api';

const MensagensTable = () => {
    const [mensagens, setMensagens] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [currentMensagemId, setCurrentMensagemId] = useState(null);
    const [mensagemForm, setMensagemForm] = useState({
        id_da_Mensagem: '',
        id_do_Remetente: '',
        id_do_Destinatario: '',
        conteudo: '',
        data_e_Hora: '',
        fotografia_do_User: ''
    });

    useEffect(() => {
        fetchMensagens();
    }, []);

    const fetchMensagens = async () => {
        try {
            const response = await getMensagens();
            setMensagens(response.data);
        } catch (error) {
            console.error('Erro ao buscar mensagens:', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await api.delete(`/mensagens/${id}`);
            fetchMensagens();
        } catch (error) {
            console.error('Erro ao eliminar a mensagem:', error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setMensagemForm({ ...mensagemForm, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isEditing) {
                await api.put(`/mensagens/${currentMensagemId}`, mensagemForm);
            } else {
                await api.post('/mensagens', mensagemForm);
            }
            fetchMensagens();
            setShowModal(false);
        } catch (error) {
            console.error('Erro ao criar ou editar mensagem:', error);
        }
    };

    const handleEdit = (mensagem) => {
        setCurrentMensagemId(mensagem.id_da_Mensagem);
        setMensagemForm({
            id_da_Mensagem: mensagem.id_da_Mensagem,
            id_do_Remetente: mensagem.id_do_Remetente,
            id_do_Destinatario: mensagem.id_do_Destinatario,
            conteudo: mensagem.conteudo,
            data_e_Hora: mensagem.data_e_Hora,
            fotografia_do_User: mensagem.fotografia_do_User
        });
        setIsEditing(true);
        setShowModal(true);
    };

    return (
        <div>
            <Button variant="primary" onClick={() => { 
                setIsEditing(false); 
                setMensagemForm({ id_do_Remetente: '', id_do_Destinatario: '', conteudo: '', data_e_Hora: '', fotografia_do_User: '' }); 
                setShowModal(true); 
            }}>Criar Nova Mensagem</Button>
            
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>{isEditing ? 'Editar Mensagem' : 'Criar Nova Mensagem'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="formRemetente">
                            <Form.Label>Remetente</Form.Label>
                            <Form.Control 
                                type="number" 
                                name="id_do_Remetente" 
                                value={mensagemForm.id_do_Remetente} 
                                onChange={handleInputChange} 
                                required 
                            />
                        </Form.Group>
                        <Form.Group controlId="formDestinatario">
                            <Form.Label>Destinatário</Form.Label>
                            <Form.Control 
                                type="number" 
                                name="id_do_Destinatario" 
                                value={mensagemForm.id_do_Destinatario} 
                                onChange={handleInputChange} 
                                required 
                            />
                        </Form.Group>
                        <Form.Group controlId="formConteudo">
                            <Form.Label>Conteúdo</Form.Label>
                            <Form.Control 
                                type="text" 
                                name="conteudo" 
                                value={mensagemForm.conteudo} 
                                onChange={handleInputChange} 
                                required 
                            />
                        </Form.Group>
                        <Form.Group controlId="formDataHora">
                            <Form.Label>Data e Hora</Form.Label>
                            <Form.Control 
                                type="datetime-local" 
                                name="data_e_Hora" 
                                value={mensagemForm.data_e_Hora} 
                                onChange={handleInputChange} 
                                required 
                            />
                        </Form.Group>
                        <Form.Group controlId="formFotografia">
                            <Form.Label>Fotografia</Form.Label>
                            <Form.Control 
                                type="number" 
                                name="fotografia_do_User" 
                                value={mensagemForm.fotografia_do_User} 
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
                        <th>ID</th>
                        <th>Remetente</th>
                        <th>Destinatário</th>
                        <th>Conteúdo</th>
                        <th>Data e Hora</th>
                        <th>Fotografia</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {mensagens.map(mensagem => (
                        <tr key={mensagem.id_da_Mensagem}>
                            <td>{mensagem.id_da_Mensagem}</td>
                            <td>{mensagem.id_do_Remetente}</td>
                            <td>{mensagem.id_do_Destinatario}</td>
                            <td>{mensagem.conteudo}</td>
                            <td>{mensagem.data_e_Hora}</td>
                            <td>{mensagem.fotografia_do_User}</td>
                            <td>
                                <Button variant="warning" onClick={() => handleEdit(mensagem)}>Editar</Button>{' '}
                                <Button variant="danger" onClick={() => handleDelete(mensagem.id_da_Mensagem)}>Apagar</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
};

export default MensagensTable;
