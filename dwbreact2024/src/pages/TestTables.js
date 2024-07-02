import React from 'react';
import UsersTable from '../Components/Tabelas/UsersTable';
import PerfisTable from '../Components/Tabelas/PerfisTable';
import ViagensTable from '../Components/Tabelas/ViagensTable';
import GruposDeViagemTable from '../Components/Tabelas/GruposDeViagemTable';
import AlojamentosTable from '../Components/Tabelas/AlojamentosTable';
import MensagensTable from '../Components/Tabelas/MensagensTable';



const TestTables = () => {
    return (
        <div>
            <h1>Testing:</h1>
            <AlojamentosTable />
            <MensagensTable />

            <h1>Funceminam:</h1>
            <GruposDeViagemTable />
            <ViagensTable />
            <UsersTable />
            <PerfisTable />
        </div>
    );
};

export default TestTables;
