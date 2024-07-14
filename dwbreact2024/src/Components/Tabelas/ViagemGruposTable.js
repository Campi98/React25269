import React, { useEffect, useState } from 'react';
import { Table, Button, Modal, Form } from 'react-bootstrap';
import { getViagemGrupos, createViagemGrupo, updateViagemGrupo, deleteViagemGrupo, getGruposDeViagem, getViagens } from '../../Services/api';

const ViagemGruposTable = () => {
    const [viagemGrupos, setViagemGrupos] = useState([]);
    const [grupos, setGrupos] = useState([]);
    const [viagens, setViagens] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [currentViagemGrupo, setCurrentViagemGrupo] = useState(null);
    const [formValues, setFormValues] = useState({
        viagemId: '',
        grupoDeViagemId: ''
    });

    useEffect(() => {
        fetchViagemGrupos();
        fetchGrupos();
        fetchViagens();
    }, []);

    const fetchViagemGrupos = async () => {
        try {
            const response = await getViagemGrupos();
            setViagemGrupos(response.data);
        } catch (error) {
            console.error('Error fetching ViagemGrupos:', error);
        }
    };

    const fetchGrupos = async () => {
        try {
            const response = await getGruposDeViagem();
            setGrupos(response.data);
        } catch (error) {
            console.error('Error fetching GruposDeViagem:', error);
        }
    };

    const fetchViagens = async () => {
        try {
            const response = await getViagens();
            setViagens(response.data);
        } catch (error) {
            console.error('Error fetching Viagens:', error);
        }
    };

    const getGroupName = (groupId) => {
        const group = grupos.find(group => group.iD_do_Grupo === groupId);
        return group ? group.nome_do_Grupo : 'No Group';
    };

    const getViagemName = (viagemId) => {
        const viagem = viagens.find(viagem => viagem.iD_da_Viagem === viagemId);
        return viagem ? viagem.destino : 'Loading';
    };

    const handleEdit = (viagemGrupo) => {
        setCurrentViagemGrupo(viagemGrupo);
        setFormValues({
            viagemId: viagemGrupo.viagemId,
            grupoDeViagemId: viagemGrupo.grupoDeViagemId
        });
        setShowModal(true);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormValues(prevValues => ({ ...prevValues, [name]: value }));
    };

    const handleSave = async () => {
        try {
            const payload = {
                viagemId: formValues.viagemId,
                grupoDeViagemId: formValues.grupoDeViagemId,
                viagem: viagens.find(viagem => viagem.iD_da_Viagem === formValues.viagemId),
                grupoDeViagem: grupos.find(grupo => grupo.iD_do_Grupo === formValues.grupoDeViagemId)
            };

            if (currentViagemGrupo) {
                await updateViagemGrupo(currentViagemGrupo.viagemId, currentViagemGrupo.grupoDeViagemId, payload);
            } else {
                await createViagemGrupo(payload);
            }
            fetchViagemGrupos();
            setShowModal(false);
        } catch (error) {
            console.error('Error saving ViagemGrupo:', error);
        }
    };

    const handleDelete = async (viagemId, grupoDeViagemId) => {
        try {
            await deleteViagemGrupo(viagemId, grupoDeViagemId);
            fetchViagemGrupos();
        } catch (error) {
            console.error('Error deleting ViagemGrupo:', error);
        }
    };

    const tableHeaders = ['ID da Viagem', 'Destino da Viagem', 'ID do Grupo', 'Nome do Grupo'];

    return (
        <div>
            <h4>Viagem Grupos</h4>
            <Button variant="primary" onClick={() => { setCurrentViagemGrupo(null); setFormValues({ viagemId: '', grupoDeViagemId: '' }); setShowModal(true); }}>Add New ViagemGrupo</Button>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        {tableHeaders.map(header => (
                            <th key={header}>{header}</th>
                        ))}
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {viagemGrupos.map(viagemGrupo => (
                        <tr key={`${viagemGrupo.viagemId}-${viagemGrupo.grupoDeViagemId}`}>
                            <td>{viagemGrupo.viagemId}</td>
                            <td>{getViagemName(viagemGrupo.viagemId)}</td>
                            <td>{viagemGrupo.grupoDeViagemId}</td>
                            <td>{getGroupName(viagemGrupo.grupoDeViagemId)}</td>
                            <td>
                                <Button variant="warning" onClick={() => handleEdit(viagemGrupo)}>Edit</Button>{' '}
                                <Button variant="danger" onClick={() => handleDelete(viagemGrupo.viagemId, viagemGrupo.grupoDeViagemId)}>Delete</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>{currentViagemGrupo ? 'Edit ViagemGrupo' : 'Add New ViagemGrupo'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label>Viagem</Form.Label>
                            <Form.Control
                                as="select"
                                name="viagemId"
                                value={formValues.viagemId || ''}
                                onChange={handleInputChange}
                            >
                                <option value="">Select Viagem</option>
                                {viagens.map(viagem => (
                                    <option key={viagem.iD_da_Viagem} value={viagem.iD_da_Viagem}>
                                        {viagem.destino}
                                    </option>
                                ))}
                            </Form.Control>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Grupo de Viagem</Form.Label>
                            <Form.Control
                                as="select"
                                name="grupoDeViagemId"
                                value={formValues.grupoDeViagemId || ''}
                                onChange={handleInputChange}
                            >
                                <option value="">Select Grupo</option>
                                {grupos.map(grupo => (
                                    <option key={grupo.iD_do_Grupo} value={grupo.iD_do_Grupo}>
                                        {grupo.nome_do_Grupo}
                                    </option>
                                ))}
                            </Form.Control>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>Close</Button>
                    <Button variant="primary" onClick={handleSave}>Save Changes</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default ViagemGruposTable;
