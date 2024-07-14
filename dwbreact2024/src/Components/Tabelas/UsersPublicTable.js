import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import { getUsers, getGruposDeViagem } from '../../Services/api';

const UsersPublicTable = () => {
    const [items, setItems] = useState([]);
    const [groups, setGroups] = useState([]);

    useEffect(() => {
        fetchItems();
        fetchGroups();
    }, []);

    const fetchItems = async () => {
        try {
            const response = await getUsers();
            setItems(response.data);
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
                    </tr>
                </thead>
                <tbody>
                    {items.map(item => (
                        <tr key={item.iD_do_User}>
                            <td>{item.iD_do_User}</td>
                            <td>{item.nome}</td>
                            <td>{item.email}</td>
                            <td>{item.tipo}</td>
                            <td>{getGroupName(item.iD_do_Grupo)}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
};

export default UsersPublicTable;
