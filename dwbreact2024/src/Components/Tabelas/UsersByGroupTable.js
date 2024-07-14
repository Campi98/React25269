import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import { getUsers, getGruposDeViagem } from '../../Services/api';

const UsersByGroupTable = () => {
    const [users, setUsers] = useState([]);
    const [groups, setGroups] = useState([]);
    const [groupedUsers, setGroupedUsers] = useState({});

    useEffect(() => {
        fetchUsers();
        fetchGroups();
    }, []);

    useEffect(() => {
        groupUsersByGroup();
    }, [users, groups]);

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

    const groupUsersByGroup = () => {
        const grouped = groups.reduce((acc, group) => {
            acc[group.iD_do_Grupo] = {
                groupName: group.nome_do_Grupo,
                users: users.filter(user => user.iD_do_Grupo === group.iD_do_Grupo)
            };
            return acc;
        }, {});
        setGroupedUsers(grouped);
    };

    return (
        <div>
            <h4>Users by Group</h4>
            {Object.keys(groupedUsers).map(groupId => (
                <div key={groupId}>
                    <h5>{groupedUsers[groupId].groupName}</h5>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Nome</th>
                                <th>Email</th>
                                <th>Tipo</th>
                            </tr>
                        </thead>
                        <tbody>
                            {groupedUsers[groupId].users.map(user => (
                                <tr key={user.iD_do_User}>
                                    <td>{user.iD_do_User}</td>
                                    <td>{user.nome}</td>
                                    <td>{user.email}</td>
                                    <td>{user.tipo}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>
            ))}
        </div>
    );
};

export default UsersByGroupTable;
