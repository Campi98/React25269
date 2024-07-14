import React, { useEffect, useState } from 'react';
import { Table, Button, Modal, Form } from 'react-bootstrap';
import { getViagens, createViagem, updateViagem, deleteViagem, getViagensByDestino } from '../../Services/api';
import { format, isValid } from 'date-fns';

const ViagensTable = ({ viagem }) => {
    const [items, setItems] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [formValues, setFormValues] = useState({});
    const [isEditing, setIsEditing] = useState(false);
    const [imageFile, setImageFile] = useState(null);

    const formFields = [
        { label: 'Fotografia', type: 'file', name: 'fotografia_relacionada_com_a_viagem' },
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

    useEffect(() => {
        fetchItems();
    }, [viagem]);

    const fetchItems = async () => {
        try {
            const response = viagem ? await getViagensByDestino(viagem) : await getViagens();
            setItems(response.data);
        } catch (error) {
            console.error('Error fetching viagens:', error);
        }
    };

    const handleShowModal = () => setShowModal(true);
    const handleCloseModal = () => {
        setShowModal(false);
        setFormValues({});
        setImageFile(null);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormValues(prevValues => ({ ...prevValues, [name]: value }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setImageFile(file);

        const reader = new FileReader();
        reader.onloadend = () => {
            setFormValues(prevValues => ({ ...prevValues, fotografia_relacionada_com_a_viagem: reader.result.replace("data:", "").replace(/^.+,/, "") }));
        };
        reader.readAsDataURL(file);
    };

    const handleSave = async () => {
        try {
            const saveAction = isEditing ? updateViagem : createViagem;
            const id = isEditing ? formValues.iD_da_Viagem : null;
            await saveAction(id, formValues);
            fetchItems();
            handleCloseModal();
        } catch (error) {
            console.error(`Error ${isEditing ? 'updating' : 'creating'} viagem:`, error);
        }
    };

    const handleEdit = (item) => {
        const formattedItem = { ...item };

        formFields.forEach(field => {
            if (field.type === 'date' && item[field.name] && isValid(new Date(item[field.name]))) {
                formattedItem[field.name] = format(new Date(item[field.name]), 'yyyy-MM-dd');
            }
        });

        setFormValues(formattedItem);
        setIsEditing(true);
        handleShowModal();
    };

    const handleDelete = async (id) => {
        try {
            await deleteViagem(id);
            fetchItems();
        } catch (error) {
            console.error('Error deleting viagem:', error);
        }
    };

    const formatDate = (dateValue) => {
        const date = new Date(dateValue);
        return isValid(date) ? format(date, 'yyyy-MM-dd') : '';
    };

    return (
        <div>
            <Button onClick={() => { setFormValues({}); setIsEditing(false); handleShowModal(); }}>Add New Viagem</Button>
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
                    {items.map(item => (
                        <tr key={item.iD_da_Viagem}>
                            {tableRowData.map(dataKey => (
                                <td key={dataKey}>
                                    {dataKey === 'fotografia_relacionada_com_a_viagem' && item[dataKey] ? (
                                        <img src={`data:image/jpeg;base64,${item[dataKey]}`} alt="Fotografia" style={{ width: '100px', height: '100px' }} />
                                    ) : dataKey === 'data_de_Inicio' || dataKey === 'data_de_Fim' ? (
                                        formatDate(item[dataKey])
                                    ) : (
                                        item[dataKey]
                                    )}
                                </td>
                            ))}
                            <td>
                                <Button variant="warning" onClick={() => handleEdit(item)}>Edit</Button>{' '}
                                <Button variant="danger" onClick={() => handleDelete(item.iD_da_Viagem)}>Delete</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>{isEditing ? 'Edit' : 'Add New'} Viagem</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        {formFields.map(field => (
                            <Form.Group key={field.name}>
                                <Form.Label>{field.label}</Form.Label>
                                {field.type === 'file' ? (
                                    <Form.Control
                                        type="file"
                                        name={field.name}
                                        onChange={handleFileChange}
                                    />
                                ) : (
                                    <Form.Control
                                        type={field.type}
                                        name={field.name}
                                        value={field.type === 'date' ? formValues[field.name] || '' : formValues[field.name] || ''}
                                        onChange={handleInputChange}
                                    />
                                )}
                            </Form.Group>
                        ))}
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>Close</Button>
                    <Button variant="primary" onClick={handleSave}>{isEditing ? 'Save Changes' : 'Add New'}</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default ViagensTable;
