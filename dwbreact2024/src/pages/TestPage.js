import React from 'react';
import UsersTable from '../Components/UsersTable';
import PerfisTable from '../Components/PerfisTable';
import AvaliacoesTable from '../Components/AvaliacoesTable';
import GruposDeViagemTable from '../Components/GruposDeViagemTable';
import MensagensTable from '../Components/MensagensTable';

const TestPage = () => {
    return (
        <div>
            <h1>Página de Testes</h1>
            <p>Esta é uma página de testes para o CRUD.</p>
            <UsersTable />
            <PerfisTable />
            <AvaliacoesTable />
            <GruposDeViagemTable />
            <MensagensTable />
        </div>
    );
};

export default TestPage;