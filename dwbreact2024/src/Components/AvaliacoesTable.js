import React from 'react';
import { getAvaliacoes, createAvaliacao, updateAvaliacao, deleteAvaliacao } from '../api';
import GenericTable from './GenericTable';

const AvaliacoesTable = () => {
    const formFields = [
        { label: 'Avaliador', type: 'number', name: 'id_do_Avaliador' },
        { label: 'Avaliado', type: 'number', name: 'id_do_Avaliado' },
        { label: 'Classificação', type: 'number', name: 'classificacao' },
        { label: 'Comentário', type: 'text', name: 'comentario' },
        { label: 'Data', type: 'datetime-local', name: 'data' }
    ];

    const tableHeaders = ['ID', 'Avaliador', 'Avaliado', 'Classificação', 'Comentário', 'Data'];
    const tableRowData = ['id_da_Avaliacao', 'id_do_Avaliador', 'id_do_Avaliado', 'classificacao', 'comentario', 'data'];

    return (
        <GenericTable
            fetchData={getAvaliacoes}
            createData={createAvaliacao}
            updateData={updateAvaliacao}
            deleteData={deleteAvaliacao}
            formFields={formFields}
            tableHeaders={tableHeaders}
            tableRowData={tableRowData}
            itemKey="id_da_Avaliacao"
            itemName="Avaliação"
        />
    );
};

export default AvaliacoesTable;
