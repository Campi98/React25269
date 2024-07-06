import React from 'react';
import { getUsers, createUser, updateUser, deleteUser } from '../../Services/api';
import GenericTable from './GenericTable';

const UsersTable = () => {
    const formFields = [
        { label: 'Nome', type: 'text', name: 'nome' },
        { label: 'Email', type: 'email', name: 'email' },
        { label: 'Senha', type: 'password', name: 'senha' },
        { label: 'Tipo', type: 'text', name: 'tipo' }
    ];

    const tableHeaders = ['ID', 'Nome', 'Email', 'Senha', 'Tipo'];
    const tableRowData = ['iD_do_User', 'nome', 'email', 'senha', 'tipo'];

    return (
        <GenericTable
            fetchData={getUsers}
            createData={createUser}
            updateData={updateUser}
            deleteData={deleteUser}
            formFields={formFields}
            tableHeaders={tableHeaders}
            tableRowData={tableRowData}
            itemKey="iD_do_User"
            itemName="Usuário"
        />
    );
};

export default UsersTable;