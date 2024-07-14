import React, { useEffect, useState } from 'react';
import { Table, Button, Modal, Form } from 'react-bootstrap';
import { getPerfis, createPerfil, updatePerfil, deletePerfil } from '../../Services/api';
import { format, isValid } from 'date-fns';

const PerfisTable = () => {
    const [items, setItems] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [formValues, setFormValues] = useState({});
    const [isEditing, setIsEditing] = useState(false);
    const [imageFile, setImageFile] = useState(null);

    const formFields = [
        { label: 'ID do User', type: 'number', name: 'iD_do_User' },
        { label: 'Fotografia do User', type: 'file', name: 'fotografia_do_User' },
        { label: 'Interesses de Viagem', type: 'text', name: 'interesses_de_Viagem' },
        { label: 'Destinos Favoritos', type: 'text', name: 'destinos_Favoritos' },
        { label: 'Nível de Experiência em Viagens', type: 'text', name: 'nivel_de_Experiencia_em_Viagens' }
    ];

    const tableHeaders = ['ID do Perfil', 'ID do User', 'Fotografia', 'Interesses', 'Destinos Favoritos', 'Nível de Experiência'];
    const tableRowData = ['iD_do_Perfil', 'iD_do_User', 'fotografia_do_User', 'interesses_de_Viagem', 'destinos_Favoritos', 'nivel_de_Experiencia_em_Viagens'];

    useEffect(() => {
        fetchItems();
    }, []);

    const fetchItems = async () => {
        try {
            const response = await getPerfis();
            setItems(response.data);
        } catch (error) {
            console.error('Error fetching perfis:', error);
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
            setFormValues(prevValues => ({ ...prevValues, fotografia_do_User: reader.result.replace("data:", "").replace(/^.+,/, "") }));
        };
        reader.readAsDataURL(file);
    };

    const handleSave = async () => {
        try {
            const saveAction = isEditing ? updatePerfil : createPerfil;
            const id = isEditing ? formValues.iD_do_Perfil : null;
            await saveAction(id, formValues);
            fetchItems();
            handleCloseModal();
        } catch (error) {
            console.error(`Error ${isEditing ? 'updating' : 'creating'} perfil:`, error);
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
            await deletePerfil(id);
            fetchItems();
        } catch (error) {
            console.error('Error deleting perfil:', error);
        }
    };

    const formatDate = (dateValue) => {
        const date = new Date(dateValue);
        return isValid(date) ? format(date, 'yyyy-MM-dd') : '';
    };

    return (
        <div>
            <Button onClick={() => { setFormValues({}); setIsEditing(false); handleShowModal(); }}>Add New Perfil</Button>
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
                        <tr key={item.iD_do_Perfil}>
                            {tableRowData.map(dataKey => (
                                <td key={dataKey}>
                                    {dataKey === 'fotografia_do_User' && item[dataKey] ? (
                                        <img src={`data:image/jpeg;base64,${item[dataKey]}`} alt="Profile" style={{ width: '100px', height: '100px' }} />
                                    ) : dataKey === 'data_de_Inicio' || dataKey === 'data_de_Fim' ? (
                                        formatDate(item[dataKey])
                                    ) : (
                                        item[dataKey]
                                    )}
                                </td>
                            ))}
                            <td>
                                <Button variant="warning" onClick={() => handleEdit(item)}>Edit</Button>{' '}
                                <Button variant="danger" onClick={() => handleDelete(item.iD_do_Perfil)}>Delete</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>{isEditing ? 'Edit' : 'Add New'} Perfil</Modal.Title>
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

export default PerfisTable;
