// src/UsersTable.js
import React, { useEffect, useState } from 'react';
import { Table, Button } from 'react-bootstrap';
import { getUsers } from '../api';

const UsersTable = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await getUsers(); // Chamada para obter utilizadores
            console.log(response.data);
            setUsers(response.data);
        } catch (error) {
            console.error('Erro ao dar fetch aos utilizadores:', error);
        }
    };


    return (
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Nome</th>
                    <th>Email</th>
                    <th>Ações</th>
                </tr>
            </thead>
            <tbody>
                {users.map(user => (
                    <tr key={user.id}>
                        <td>{user.id}</td>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>
                            <Button variant="warning" onClick={() => console.log('Editar', user.id)}>Editar</Button>{' '}
                        </td>
                    </tr>
                ))}
            </tbody>
        </Table>
    );
};

export default UsersTable;
