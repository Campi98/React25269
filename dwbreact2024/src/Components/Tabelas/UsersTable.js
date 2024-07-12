import React from 'react';
import { getUsers, createUser, updateUser, deleteUser } from '../../Services/api';
import GenericTable from './GenericTable';

const UsersTable = () => {
    const formFields = [
        { label: 'Nome', type: 'text', name: 'nome' },
        { label: 'Email', type: 'email', name: 'email' },
        { label: 'Senha', type: 'password', name: 'senha' },
        { label: 'Tipo', type: 'text', name: 'tipo' },
        // ID_do_Grupo
        { label: 'ID do Grupo', type: 'number', name: 'ID_do_Grupo'}
    ];

    const tableHeaders = ['ID', 'Nome', 'Email', 'Senha', 'Tipo', 'ID do Grupo'];
    const tableRowData = ['iD_do_User', 'nome', 'email', 'senha', 'tipo', 'iD_do_Grupo'];

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
