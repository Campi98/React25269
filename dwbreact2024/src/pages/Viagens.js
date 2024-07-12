import React, { useEffect, useState } from 'react';
import { Box, Typography, Button, CssBaseline, Divider, TextField } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Modal } from 'react-bootstrap';
import AuthenticatedAppBar from '../Components/CompLP/AuthenticatedAppBar';
import getLPTheme from './LandingPage/getLPTheme';
import { getViagens, createViagem, updateViagem, deleteViagem, getViagensByDestino} from '../Services/api';
import ViagensTable from '../Components/Tabelas/ViagensTable';
import SaveIcon from '@mui/icons-material/Save';
import { useSearchParams} from 'react-router-dom';


const Viagens = () => {
  const [mode, setMode] = useState('dark');
  const [viagensData, setViagensData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedViagem, setEditedViagem] = useState({});
  const [currentViagem, setCurrentViagem] = useState(null);
  const LPtheme = createTheme(getLPTheme(mode));

  //get query params from url for destination name using react-router-dom
  const [search] = useSearchParams();

  const destino = search.get('destino');
  

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

  useEffect(() => {
    fetchViagens();
  }, []);

  const fetchViagens = () => {

    if(search.get('destino') !== null){
      getViagensByDestino(search.get('destino')).then(response => {
        setViagensData(response.data);
      }).catch(error => {
        console.error('Error fetching viagens data:', error);
      });
    }
    else {   
      getViagens().then(response => {
        setViagensData(response.data);
      }).catch(error => {
        console.error('Error fetching viagens data:', error);
      });
    };
  }

  const toggleColorMode = () => {
    setMode((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const handleSaveChanges = async () => {
    if (isEditing) {
      await updateViagem(currentViagem.iD_da_Viagem, editedViagem);
    } else {
      await createViagem(editedViagem);
    }
    fetchViagens();
    setShowModal(false);
  };

  const handleDelete = async (id) => {
    await deleteViagem(id);
    fetchViagens();
  };

  const handleEdit = (viagem) => {
    setCurrentViagem(viagem);
    setEditedViagem(viagem);
    setIsEditing(true);
    setShowModal(true);
  };

  return (
    <ThemeProvider theme={LPtheme}>
      <CssBaseline />
      <AuthenticatedAppBar mode={mode} toggleColorMode={toggleColorMode} />
      <Box sx={{ bgcolor: 'background.default', padding: 10 }}>
        <Typography variant="h4" gutterBottom>
          Viagens Management
        </Typography>
        <Divider sx={{ marginBottom: 2 }} />
        <Button variant="contained" color="primary" onClick={() => { setIsEditing(false); setShowModal(true); }}>
          Add New Viagem
        </Button>
        <ViagensTable
        viagem={destino !== null ? destino : null}
          data={viagensData}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
        <Modal show={showModal} onHide={() => setShowModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>{isEditing ? 'Edit Viagem' : 'Add New Viagem'}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {formFields.map(field => (
              <TextField
                key={field.name}
                label={field.label}
                type={field.type}
                name={field.name}
                value={editedViagem[field.name] || ''}
                onChange={(e) => setEditedViagem({ ...editedViagem, [field.name]: e.target.value })}
                fullWidth
                sx={{ marginY: 2 }}
              />
            ))}
            <Button variant="contained" color="primary" onClick={handleSaveChanges} startIcon={<SaveIcon />} sx={{ marginTop: 2 }}>
              Save Changes
            </Button>
          </Modal.Body>
        </Modal>
      </Box>
    </ThemeProvider>
  );
};

export default Viagens;
