import React from 'react';
import UsersTable from '../Components/Tabelas/UsersTable';
import PerfisTable from '../Components/Tabelas/PerfisTable';
import AvaliacoesTable from '../Components/Tabelas/AvaliacoesTable';
import GruposDeViagemTable from '../Components/Tabelas/GruposDeViagemTable';
import MensagensTable from '../Components/Tabelas/MensagensTable';
import ImagensTable from '../Components/Tabelas/ImagensTable';

const TestTables = () => {
    return (
        <div>
            <h1>Página de Testes para o CRUD.</h1>
            <ImagensTable />
            <UsersTable />
            <PerfisTable />
            <AvaliacoesTable />
            <GruposDeViagemTable />
            <MensagensTable />
        </div>
    );
};

export default TestTables;
