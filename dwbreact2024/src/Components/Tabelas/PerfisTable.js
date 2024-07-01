import React from 'react';
import { getPerfis, createPerfil, updatePerfil, deletePerfil } from '../../Services/api';
import GenericTable from './GenericTable';

const PerfisTable = () => {
    const formFields = [
        { label: 'ID do User', type: 'text', name: 'id_do_User' },
        { label: 'Fotografia do User', type: 'text', name: 'fotografia_do_User' },
        { label: 'Interesses de Viagem', type: 'text', name: 'interesses_de_Viagem' },
        { label: 'Destinos Favoritos', type: 'text', name: 'destinos_Favoritos' },
        { label: 'Nível de Experiência em Viagens', type: 'text', name: 'nivel_de_Experiencia_em_Viagens' }
    ];

    const tableHeaders = ['ID do Perfil', 'ID do User', 'Fotografia', 'Interesses', 'Destinos Favoritos', 'Nível de Experiência'];
    const tableRowData = ['id_do_Perfil', 'id_do_User', 'fotografia_do_User', 'interesses_de_Viagem', 'destinos_Favoritos', 'nivel_de_Experiencia_em_Viagens'];

    return (
        <GenericTable
            fetchData={getPerfis}
            createData={createPerfil}
            updateData={updatePerfil}
            deleteData={deletePerfil}
            formFields={formFields}
            tableHeaders={tableHeaders}
            tableRowData={tableRowData}
            itemKey="id_do_Perfil"
            itemName="Perfil"
        />
    );
};

export default PerfisTable;
