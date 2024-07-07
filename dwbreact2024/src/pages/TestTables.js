import React from 'react';
import { Tabs, Tab, Box } from '@mui/material';
import UsersTable from '../Components/Tabelas/UsersTable';
import PerfisTable from '../Components/Tabelas/PerfisTable';
import ViagensTable from '../Components/Tabelas/ViagensTable';
import GruposDeViagemTable from '../Components/Tabelas/GruposDeViagemTable';
import AlojamentosTable from '../Components/Tabelas/AlojamentosTable';
import MensagensTable from '../Components/Tabelas/MensagensTable';
import ImagensTable from '../Components/Tabelas/ImagensTable';

function TabPanel(props) {
    const { children, value, index, ...other } = props;
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    {children}
                </Box>
            )}
        </div>
    );
}

const TestTables = () => {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div>
            <h1>Testing:</h1>
            <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
                <Tab label="Alojamentos" />
                <Tab label="Mensagens" />
                <Tab label="Grupos De Viagem" />
                <Tab label="Viagens" />
                <Tab label="Users" />
                <Tab label="Perfis" />
                <Tab label="Imagens" />
            </Tabs>
            <TabPanel value={value} index={0}>
                <AlojamentosTable />
            </TabPanel>
            <TabPanel value={value} index={1}>
                <MensagensTable />
            </TabPanel>
            <TabPanel value={value} index={2}>
                <GruposDeViagemTable />
            </TabPanel>
            <TabPanel value={value} index={3}>
                <ViagensTable />
            </TabPanel>
            <TabPanel value={value} index={4}>
                <UsersTable />
            </TabPanel>
            <TabPanel value={value} index={5}>
                <PerfisTable />
            </TabPanel>
            <TabPanel value={value} index={6}>
                <ImagensTable />
            </TabPanel>
        </div>
    );
};

export default TestTables;