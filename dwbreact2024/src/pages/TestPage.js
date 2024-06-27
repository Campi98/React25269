import React from 'react';
import UsersTable from '../Components/UsersTable';
import PerfisTable from '../Components/PerfisTable';

const TestPage = () => {
    return (
        <div>
            <h1>Página de Testes</h1>
            <p>Esta é uma página de testes para o CRUD.</p>
            <UsersTable />
            <PerfisTable />
        </div>
    );
};

export default TestPage;
