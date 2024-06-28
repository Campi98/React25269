import React, { useEffect, useState } from 'react';
import { Table, Button, Modal, Form } from 'react-bootstrap';
import { getGruposDeViagem, createGrupoDeViagem, updateGrupoDeViagem, deleteGrupoDeViagem } from '../api';

const GruposDeViagemTable = () => {
    const [gruposDeViagem, setGruposDeViagem] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [currentGrupoId, setCurrentGrupoId] = useState(null);
    const [grupoForm, setGrupoForm] = useState({
        adminUser: '',
        nome_do_Grupo: '',
        destino: '',
        data_de_Inicio: '',
        data_de_Fim: '',
        descricao: ''
    });

    useEffect(() => {
        fetchGruposDeViagem();
    }, []);

    const fetchGruposDeViagem = async () => {
        try {
            const response = await getGruposDeViagem();
            setGruposDeViagem(response.data);
        } catch (error) {
            console.error('Erro ao dar fetch aos grupos de viagem:', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await deleteGrupoDeViagem(id);
            fetchGruposDeViagem();
        } catch (error) {
            console.error('Erro ao eliminar o grupo de viagem:', error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setGrupoForm({ ...grupoForm, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isEditing) {
                await updateGrupoDeViagem(currentGrupoId, grupoForm);
            } else {
                await createGrupoDeViagem(grupoForm);
            }
            fetchGruposDeViagem();
            setShowModal(false);
        } catch (error) {
            console.error('Erro ao criar ou editar grupo de viagem:', error);
        }
    };

    const handleEdit = (grupo) => {
        setCurrentGrupoId(grupo.id_do_Grupo);
        setGrupoForm({
            adminUser: grupo.adminUser,
            nome_do_Grupo: grupo.nome_do_Grupo,
            destino: grupo.destino,
            data_de_Inicio: grupo.data_de_Inicio.split('T')[0],
            data_de_Fim: grupo.data_de_Fim.split('T')[0],
            descricao: grupo.descricao
        });
        setIsEditing(true);
        setShowModal(true);
    };

    return (
        <div>
            <Button variant="primary" onClick={() => { 
                setIsEditing(false); 
                setGrupoForm({ adminUser: '', nome_do_Grupo: '', destino: '', data_de_Inicio: '', data_de_Fim: '', descricao: '' }); 
                setShowModal(true); 
            }}>Criar Novo Grupo de Viagem</Button>
            
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>{isEditing ? 'Editar Grupo de Viagem' : 'Criar Novo Grupo de Viagem'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="formAdminUser">
                            <Form.Label>Admin User</Form.Label>
                            <Form.Control 
                                type="number" 
                                name="adminUser" 
                                value={grupoForm.adminUser} 
                                onChange={handleInputChange} 
                                required 
                            />
                        </Form.Group>
                        <Form.Group controlId="formNomeGrupo">
                            <Form.Label>Nome do Grupo</Form.Label>
                            <Form.Control 
                                type="text" 
                                name="nome_do_Grupo" 
                                value={grupoForm.nome_do_Grupo} 
                                onChange={handleInputChange} 
                                required 
                            />
                        </Form.Group>
                        <Form.Group controlId="formDestino">
                            <Form.Label>Destino</Form.Label>
                            <Form.Control 
                                type="text" 
                                name="destino" 
                                value={grupoForm.destino} 
                                onChange={handleInputChange} 
                                required 
                            />
                        </Form.Group>
                        <Form.Group controlId="formDataInicio">
                            <Form.Label>Data de Início</Form.Label>
                            <Form.Control 
                                type="date" 
                                name="data_de_Inicio" 
                                value={grupoForm.data_de_Inicio} 
                                onChange={handleInputChange} 
                                required 
                            />
                        </Form.Group>
                        <Form.Group controlId="formDataFim">
                            <Form.Label>Data de Fim</Form.Label>
                            <Form.Control 
                                type="date" 
                                name="data_de_Fim" 
                                value={grupoForm.data_de_Fim} 
                                onChange={handleInputChange} 
                                required 
                            />
                        </Form.Group>
                        <Form.Group controlId="formDescricao">
                            <Form.Label>Descrição</Form.Label>
                            <Form.Control 
                                type="text" 
                                name="descricao" 
                                value={grupoForm.descricao} 
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
                        <th>Admin User</th>
                        <th>Nome do Grupo</th>
                        <th>Destino</th>
                        <th>Data de Início</th>
                        <th>Data de Fim</th>
                        <th>Descrição</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {gruposDeViagem.map(grupo => (
                        <tr key={grupo.id_do_Grupo}>
                            <td>{grupo.id_do_Grupo}</td>
                            <td>{grupo.adminUser}</td>
                            <td>{grupo.nome_do_Grupo}</td>
                            <td>{grupo.destino}</td>
                            <td>{grupo.data_de_Inicio}</td>
                            <td>{grupo.data_de_Fim}</td>
                            <td>{grupo.descricao}</td>
                            <td>
                                <Button variant="warning" onClick={() => handleEdit(grupo)}>Editar</Button>{' '}
                                <Button variant="danger" onClick={() => handleDelete(grupo.id_do_Grupo)}>Apagar</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
};

export default GruposDeViagemTable;
