import React from 'react';
import { getMensagens, createMensagem, updateMensagem, deleteMensagem } from '../../Services/api';
import GenericTable from './GenericTable';

const MensagensTable = () => {
    const formFields = [
        { label: 'Remetente', type: 'number', name: 'id_do_Remetente' },
        { label: 'Destinatário', type: 'number', name: 'id_do_Destinatario' },
        { label: 'Conteúdo', type: 'text', name: 'conteudo' },
        { label: 'Data e Hora', type: 'datetime-local', name: 'data_e_Hora' },
        { label: 'Fotografia', type: 'number', name: 'fotografia_do_User' }
    ];

    const tableHeaders = ['ID', 'Remetente', 'Destinatário', 'Conteúdo', 'Data e Hora', 'Fotografia'];
    const tableRowData = ['id_da_Mensagem', 'id_do_Remetente', 'id_do_Destinatario', 'conteudo', 'data_e_Hora', 'fotografia_do_User'];

    return (
        <GenericTable
            fetchData={getMensagens}
            createData={createMensagem}
            updateData={updateMensagem}
            deleteData={deleteMensagem}
            formFields={formFields}
            tableHeaders={tableHeaders}
            tableRowData={tableRowData}
            itemKey="id_da_Mensagem"
            itemName="Mensagem"
        />
    );
};

export default MensagensTable;
