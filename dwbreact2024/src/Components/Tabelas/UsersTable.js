import React, { useEffect, useState } from 'react';
import { Table, Button, Modal, Form } from 'react-bootstrap';
import { getUsers, updateUser, deleteUser, getGruposDeViagem } from '../../Services/api';

const UsersTable = () => {
    const [users, setUsers] = useState([]);
    const [groups, setGroups] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);
    const [formValues, setFormValues] = useState({});

    useEffect(() => {
        fetchUsers();
        fetchGroups();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await getUsers();
            setUsers(response.data);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    const fetchGroups = async () => {
        try {
            const response = await getGruposDeViagem();
            setGroups(response.data);
        } catch (error) {
            console.error('Error fetching groups:', error);
        }
    };

    const getGroupName = (groupId) => {
        const group = groups.find(group => group.iD_do_Grupo === groupId);
        return group ? group.nome_do_Grupo : 'No Group';
    };

    const handleEdit = (user) => {
        setCurrentUser(user);
        setFormValues(user);
        setShowModal(true);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormValues(prevValues => ({ ...prevValues, [name]: value }));
    };

    const handleSave = async () => {
        try {
            await updateUser(currentUser.iD_do_User, formValues);
            fetchUsers();
            setShowModal(false);
        } catch (error) {
            console.error('Error updating user:', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await deleteUser(id);
            fetchUsers();
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    const tableHeaders = ['ID', 'Nome', 'Email', 'Tipo', 'Nome do Grupo'];

    return (
        <div>
            <h4>Users</h4>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        {tableHeaders.map(header => (
                            <th key={header}>{header}</th>
                        ))}
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user.iD_do_User}>
                            <td>{user.iD_do_User}</td>
                            <td>{user.nome}</td>
                            <td>{user.email}</td>
                            <td>{user.tipo}</td>
                            <td>{getGroupName(user.iD_do_Grupo)}</td>
                            <td>
                                <Button variant="warning" onClick={() => handleEdit(user)}>Edit</Button>{' '}
                                <Button variant="danger" onClick={() => handleDelete(user.iD_do_User)}>Delete</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit User</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label>Nome</Form.Label>
                            <Form.Control
                                type="text"
                                name="nome"
                                value={formValues.nome || ''}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                name="email"
                                value={formValues.email || ''}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Tipo</Form.Label>
                            <Form.Control
                                as="select"
                                name="tipo"
                                value={formValues.tipo || ''}
                                onChange={handleInputChange}
                            >
                                <option value="User">User</option>
                                <option value="Admin">Admin</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Nome do Grupo</Form.Label>
                            <Form.Control
                                as="select"
                                name="iD_do_Grupo"
                                value={formValues.iD_do_Grupo || ''}
                                onChange={handleInputChange}
                            >
                                {groups.map(group => (
                                    <option key={group.iD_do_Grupo} value={group.iD_do_Grupo}>
                                        {group.nome_do_Grupo}
                                    </option>
                                ))}
                            </Form.Control>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>Close</Button>
                    <Button variant="primary" onClick={handleSave}>Save Changes</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default UsersTable;
