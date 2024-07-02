import React from 'react';
import { getAlojamentos, createAlojamento, updateAlojamento, deleteAlojamento } from '../../Services/api';
import GenericTable from './GenericTable';

const AlojamentosTable = () => {
    const formFields = [
        { label: 'Nome', type: 'text', name: 'nome' },
        { label: 'Localização', type: 'text', name: 'localizacao' },
        { label: 'Capacidade', type: 'number', name: 'capacidade' },
        { label: 'Preço por Noite', type: 'number', name: 'precoPorNoite' },
        { label: 'Descrição', type: 'text', name: 'descricao' },
        { label: 'Data Disponível', type: 'date', name: 'dataDisponivel' },
        { label: 'Proprietário', type: 'text', name: 'proprietario' },
        { label: 'Telefone do Proprietário', type: 'text', name: 'telefoneProprietario' },
        { label: 'ID da Viagem', type: 'number', name: 'iD_da_Viagem' }  // Ensure case consistency
    ];

    const tableHeaders = ['ID', 'Nome', 'Localização', 'Capacidade', 'Preço por Noite', 'Descrição', 'Data Disponível', 'Proprietário', 'Telefone do Proprietário', 'ID da Viagem'];
    const tableRowData = ['id', 'nome', 'localizacao', 'capacidade', 'precoPorNoite', 'descricao', 'dataDisponivel', 'proprietario', 'telefoneProprietario', 'iD_da_Viagem']; 

    return (
        <GenericTable
            fetchData={getAlojamentos}
            createData={createAlojamento}
            updateData={updateAlojamento}
            deleteData={deleteAlojamento}
            formFields={formFields}
            tableHeaders={tableHeaders}
            tableRowData={tableRowData}
            itemKey="id"
            itemName="Alojamento"
        />
    );
};

export default AlojamentosTable;
