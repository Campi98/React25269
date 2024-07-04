import React from 'react';
import { getMensagens, createMensagem, updateMensagem, deleteMensagem } from '../../Services/api';
import GenericTable from './GenericTable';

const MensagensTable = () => {
    const formFields = [
        { label: 'Conteúdo', type: 'text', name: 'conteudo' },
        { label: 'Data e Hora', type: 'datetime-local', name: 'data_e_hora' },
        { label: 'ID do Remetente', type: 'number', name: 'id_do_remetente' },
        { label: 'ID do Destinatario', type: 'number', name: 'id_do_destinatario' }
    ];

    const tableHeaders = ['ID', 'Conteúdo', 'Data e Hora', 'ID do Remetente', 'ID do Destinatario'];
    const tableRowData = ['iD_da_Mensagem', 'conteudo', 'data_e_Hora', 'iD_do_Remetente', 'iD_do_Destinatario'];

    return (
        <GenericTable
            fetchData={getMensagens}
            createData={createMensagem}
            updateData={updateMensagem}
            deleteData={deleteMensagem}
            formFields={formFields}
            tableHeaders={tableHeaders}
            tableRowData={tableRowData}
            itemKey="iD_da_Mensagem"
            itemName="Mensagem"
        />
    );
};

export default MensagensTable;
