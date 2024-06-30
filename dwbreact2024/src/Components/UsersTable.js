import React, { useEffect, useState } from 'react';
import { Table, Button, Modal, Form, Alert } from 'react-bootstrap';
import { getUsers, createUser, updateUser, deleteUser } from '../api';

const UsersTable = () => {
    const [users, setUsers] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [currentUserId, setCurrentUserId] = useState(null);
    const [userForm, setUserForm] = useState({
        id_do_User: '',
        nome: '',
        email: '',
        senha: '',
        tipo: ''
    });
    const [errors, setErrors] = useState({});

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await getUsers();
            setUsers(response.data);
        } catch (error) {
            console.error('Erro ao dar fetch aos utilizadores:', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await deleteUser(id);
            fetchUsers();
        } catch (error) {
            console.error('Erro ao eliminar o utilizador:', error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserForm({ ...userForm, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isEditing) {
                await updateUser(currentUserId, userForm);
            } else {
                await createUser(userForm);
            }
            fetchUsers();
            setShowModal(false);
            setErrors({});
        } catch (error) {
            if (error.response && error.response.data) {
                setErrors(error.response.data.errors || {});
            } else {
                console.error('Erro ao criar ou editar utilizador:', error);
            }
        }
    };

    const handleEdit = (user) => {
        setCurrentUserId(user.id_do_User);
        setUserForm({
            id_do_User: user.id_do_User,
            nome: user.nome,
            email: user.email,
            senha: user.senha,
            tipo: user.tipo
        });
        setIsEditing(true);
        setShowModal(true);
    };

    return (
        <div>
            <Button variant="primary" onClick={() => { 
                setIsEditing(false); 
                setUserForm({ nome: '', email: '', senha: '', tipo: '' }); 
                setShowModal(true); 
            }}>Criar Novo Utilizador</Button>
            
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>{isEditing ? 'Editar Utilizador' : 'Criar Novo Utilizador'}</Modal.Title>
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
                        <Form.Group controlId="formNome">
                            <Form.Label>Nome</Form.Label>
                            <Form.Control 
                                type="text" 
                                name="nome" 
                                value={userForm.nome} 
                                onChange={handleInputChange} 
                            />
                        </Form.Group>
                        <Form.Group controlId="formEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control 
                                type="email" 
                                name="email" 
                                value={userForm.email} 
                                onChange={handleInputChange} 
                            />
                        </Form.Group>
                        <Form.Group controlId="formSenha">
                            <Form.Label>Senha</Form.Label>
                            <Form.Control 
                                type="password" 
                                name="senha" 
                                value={userForm.senha} 
                                onChange={handleInputChange} 
                            />
                        </Form.Group>
                        <Form.Group controlId="formTipo">
                            <Form.Label>Tipo</Form.Label>
                            <Form.Control 
                                type="text" 
                                name="tipo" 
                                value={userForm.tipo} 
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
                        <th>Nome</th>
                        <th>Email</th>
                        <th>Senha</th>
                        <th>Tipo</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user.id_do_User}>
                            <td>{user.id_do_User}</td>
                            <td>{user.nome}</td>
                            <td>{user.email}</td>
                            <td>{user.senha}</td>
                            <td>{user.tipo}</td>
                            <td>
                                <Button variant="warning" onClick={() => handleEdit(user)}>Editar</Button>{' '}
                                <Button variant="danger" onClick={() => handleDelete(user.id_do_User)}>Apagar</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
};

export default UsersTable;
