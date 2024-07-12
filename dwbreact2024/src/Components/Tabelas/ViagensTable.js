import React from 'react';
import { getViagens, createViagem, updateViagem, deleteViagem, getViagensByDestino } from '../../Services/api';
import GenericTable from './GenericTable';

const ViagensTable = ({viagem}) => {
    const formFields = [
        { label: 'Fotografia', type: 'text', name: 'fotografia_relacionada_com_a_viagem' },
        { label: 'Destino', type: 'text', name: 'destino' },
        { label: 'Data de Início', type: 'date', name: 'data_de_Inicio' },
        { label: 'Data de Fim', type: 'date', name: 'data_de_Fim' },
        { label: 'Descrição', type: 'text', name: 'descricao' },
        { label: 'Itinerário', type: 'text', name: 'itinerario' },
        { label: 'Dicas e Recomendações', type: 'text', name: 'dicas_e_Recomendacoes' },
        { label: 'Rating da Viagem', type: 'number', name: 'rating_da_Viagem' }
    ];

    const tableHeaders = ['ID', 'Fotografia', 'Destino', 'Data de Início', 'Data de Fim', 'Descrição', 'Itinerário', 'Dicas e Recomendações', 'Rating'];
    const tableRowData = ['iD_da_Viagem', 'fotografia_relacionada_com_a_viagem', 'destino', 'data_de_Inicio', 'data_de_Fim', 'descricao', 'itinerario', 'dicas_e_Recomendacoes', 'rating_da_Viagem'];

    console.log(viagem);

    return (
        <GenericTable
            fetchData={viagem ? getViagensByDestino : getViagens}
            viagem={viagem}
            createData={createViagem}
            updateData={updateViagem}
            deleteData={deleteViagem}
            formFields={formFields}
            tableHeaders={tableHeaders}
            tableRowData={tableRowData}
            itemKey="iD_da_Viagem"
            itemName="Viagem"
        />
    );
};

export default ViagensTable;
