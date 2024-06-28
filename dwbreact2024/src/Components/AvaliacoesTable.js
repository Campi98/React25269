import React, { useEffect, useState } from 'react';
import { Table, Button, Modal, Form, Alert } from 'react-bootstrap';
import api, { getAvaliacoes } from '../api';

const AvaliacoesTable = () => {
    const [avaliacoes, setAvaliacoes] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [currentAvaliacaoId, setCurrentAvaliacaoId] = useState(null);
    const [avaliacaoForm, setAvaliacaoForm] = useState({
        id_do_Avaliador: '',
        id_do_Avaliado: '',
        classificacao: '',
        comentario: '',
        data: ''
    });
    const [errors, setErrors] = useState({});

    useEffect(() => {
        fetchAvaliacoes();
    }, []);

    const fetchAvaliacoes = async () => {
        try {
            const response = await getAvaliacoes();
            setAvaliacoes(response.data);
        } catch (error) {
            console.error('Erro ao dar fetch às avaliações:', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await api.delete(`/avaliacoes/${id}`);
            fetchAvaliacoes();
        } catch (error) {
            console.error('Erro ao eliminar a avaliação:', error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setAvaliacaoForm({ ...avaliacaoForm, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formattedData = {
                ...avaliacaoForm,
                id_do_Avaliador: parseInt(avaliacaoForm.id_do_Avaliador, 10),
                id_do_Avaliado: parseInt(avaliacaoForm.id_do_Avaliado, 10),
                classificacao: parseInt(avaliacaoForm.classificacao, 10),
            };
            if (isEditing) {
                await api.put(`/avaliacoes/${currentAvaliacaoId}`, formattedData);
            } else {
                await api.post('/avaliacoes', formattedData);
            }
            fetchAvaliacoes();
            setShowModal(false);
            setErrors({});
        } catch (error) {
            if (error.response && error.response.data) {
                setErrors(error.response.data.errors || {});
            } else {
                console.error('Erro ao criar ou editar avaliação:', error);
            }
        }
    };

    const handleEdit = (avaliacao) => {
        setCurrentAvaliacaoId(avaliacao.id_da_Avaliacao);
        setAvaliacaoForm({
            id_do_Avaliador: avaliacao.id_do_Avaliador,
            id_do_Avaliado: avaliacao.id_do_Avaliado,
            classificacao: avaliacao.classificacao,
            comentario: avaliacao.comentario,
            data: avaliacao.data
        });
        setIsEditing(true);
        setShowModal(true);
    };

    return (
        <div>
            <Button variant="primary" onClick={() => { 
                setIsEditing(false); 
                setAvaliacaoForm({ id_do_Avaliador: '', id_do_Avaliado: '', classificacao: '', comentario: '', data: '' }); 
                setShowModal(true); 
            }}>Criar Nova Avaliação</Button>
            
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>{isEditing ? 'Editar Avaliação' : 'Criar Nova Avaliação'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {Object.keys(errors).length > 0 && (
                        <Alert variant="danger">
                            <ul>
                                {Object.keys(errors).map((key, index) => (
                                    <li key={index}>{errors[key].join(', ')}</li>
                                ))}
                            </ul>
                        </Alert>
                    )}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="formAvaliador">
                            <Form.Label>Avaliador</Form.Label>
                            <Form.Control 
                                type="number" 
                                name="id_do_Avaliador" 
                                value={avaliacaoForm.id_do_Avaliador} 
                                onChange={handleInputChange} 
                            />
                        </Form.Group>
                        <Form.Group controlId="formAvaliado">
                            <Form.Label>Avaliado</Form.Label>
                            <Form.Control 
                                type="number" 
                                name="id_do_Avaliado" 
                                value={avaliacaoForm.id_do_Avaliado} 
                                onChange={handleInputChange} 
                            />
                        </Form.Group>
                        <Form.Group controlId="formClassificacao">
                            <Form.Label>Classificação</Form.Label>
                            <Form.Control 
                                type="number" 
                                name="classificacao" 
                                value={avaliacaoForm.classificacao} 
                                onChange={handleInputChange} 
                            />
                        </Form.Group>
                        <Form.Group controlId="formComentario">
                            <Form.Label>Comentário</Form.Label>
                            <Form.Control 
                                type="text" 
                                name="comentario" 
                                value={avaliacaoForm.comentario} 
                                onChange={handleInputChange} 
                            />
                        </Form.Group>
                        <Form.Group controlId="formData">
                            <Form.Label>Data</Form.Label>
                            <Form.Control 
                                type="date" 
                                name="data" 
                                value={avaliacaoForm.data} 
                                onChange={handleInputChange} 
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
                        <th>Avaliador</th>
                        <th>Avaliado</th>
                        <th>Classificação</th>
                        <th>Comentário</th>
                        <th>Data</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {avaliacoes.map(avaliacao => (
                        <tr key={avaliacao.id_da_Avaliacao}>
                            <td>{avaliacao.id_da_Avaliacao}</td>
                            <td>{avaliacao.id_do_Avaliador}</td>
                            <td>{avaliacao.id_do_Avaliado}</td>
                            <td>{avaliacao.classificacao}</td>
                            <td>{avaliacao.comentario}</td>
                            <td>{avaliacao.data}</td>
                            <td>
                                <Button variant="warning" onClick={() => handleEdit(avaliacao)}>Editar</Button>{' '}
                                <Button variant="danger" onClick={() => handleDelete(avaliacao.id_da_Avaliacao)}>Apagar</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
};

export default AvaliacoesTable;
