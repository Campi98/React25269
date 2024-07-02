import React from 'react';
import { getGruposDeViagem, createGrupoDeViagem, updateGrupoDeViagem, deleteGrupoDeViagem } from '../../Services/api';
import GenericTable from './GenericTable';

const GruposDeViagemTable = () => {
    const formFields = [
        { label: 'Nome do Grupo', type: 'text', name: 'nome_do_Grupo' },
        { label: 'Destino', type: 'text', name: 'destino' },
        { label: 'Data de Início', type: 'date', name: 'data_de_Inicio' },
        { label: 'Data de Fim', type: 'date', name: 'data_de_Fim' },
        { label: 'Descrição', type: 'text', name: 'descricao' }
    ];

    const tableHeaders = ['ID', 'Nome do Grupo', 'Destino', 'Data de Início', 'Data de Fim', 'Descrição'];
    const tableRowData = ['iD_do_Grupo', 'nome_do_Grupo', 'destino', 'data_de_Inicio', 'data_de_Fim', 'descricao'];

    return (
        <GenericTable
            fetchData={getGruposDeViagem}
            createData={createGrupoDeViagem}
            updateData={updateGrupoDeViagem}
            deleteData={deleteGrupoDeViagem}
            formFields={formFields}
            tableHeaders={tableHeaders}
            tableRowData={tableRowData}
            itemKey="iD_do_Grupo"
            itemName="Grupo de Viagem"
        />
    );
};

export default GruposDeViagemTable;
