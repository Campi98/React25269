import React, { useEffect, useState, useCallback } from 'react';
import { Table, Button, Modal, Form, Alert } from 'react-bootstrap';

const GenericTable = ({
    fetchData,
    createData,
    updateData,
    deleteData,
    formFields,
    tableHeaders,
    tableRowData,
    itemKey,
    itemName
}) => {
    const [items, setItems] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [currentItemId, setCurrentItemId] = useState(null);
    const [itemForm, setItemForm] = useState({});
    const [errors, setErrors] = useState({});

    const fetchItems = useCallback(async () => {
        try {
            const response = await fetchData();
            setItems(response.data);
        } catch (error) {
            console.error(`Erro ao dar fetch aos ${itemName}:`, error);
        }
    }, [fetchData, itemName]);

    useEffect(() => {
        fetchItems();
    }, [fetchItems]);

    const handleDelete = async (id) => {
        try {
            await deleteData(id);
            fetchItems();
        } catch (error) {
            console.error(`Erro ao eliminar o ${itemName}:`, error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setItemForm({ ...itemForm, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isEditing) {
                await updateData(currentItemId, itemForm);
            } else {
                await createData(itemForm);
            }
            fetchItems();
            setShowModal(false);
            setErrors({});
        } catch (error) {
            if (error.response && error.response.data) {
                setErrors(error.response.data.errors || {});
            } else {
                console.error(`Erro ao criar ou editar o ${itemName}:`, error);
            }
        }
    };

    const handleEdit = (item) => {
        setCurrentItemId(item[itemKey]);
        setItemForm(item);
        setIsEditing(true);
        setShowModal(true);
    };

    const renderFormFields = () => {
        return formFields.map(({ label, type, name, component }, index) => (
            <Form.Group controlId={`form${name}`} key={index}>
                <Form.Label>{label}</Form.Label>
                {type === 'custom' ? (
                    component
                ) : (
                    <Form.Control
                        type={type}
                        name={name}
                        value={itemForm[name] || ''}
                        onChange={handleInputChange}
                        required
                    />
                )}
            </Form.Group>
        ));
    };

    return (
        <div>
            <Button variant="primary" onClick={() => { 
                setIsEditing(false); 
                setItemForm({}); 
                setShowModal(true); 
            }}>{`Criar Novo ${itemName}`}</Button>
            
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>{isEditing ? `Editar ${itemName}` : `Criar Novo ${itemName}`}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {Object.keys(errors).length > 0 && (
                        <Alert variant="danger">
                            <ul>
                                {Object.keys(errors).map((key, index) => (
                                    <li key={index}>{errors[key].join(', ')}</li>
                                ))}
                            </ul>
                        </Alert>
                    )}
                    <Form onSubmit={handleSubmit}>
                        {renderFormFields()}
                        <Button variant="primary" type="submit">
                            {isEditing ? 'Guardar Alterações' : 'Criar'}
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
            
            <Table striped bordered hover>
                <thead>
                    <tr>
                        {tableHeaders.map((header, index) => (
                            <th key={index}>{header}</th>
                        ))}
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map(item => (
                        <tr key={item[itemKey]}>
                            {tableRowData.map((dataKey, index) => (
                                <td key={index}>{item[dataKey]}</td>
                            ))}
                            <td>
                                <Button variant="warning" onClick={() => handleEdit(item)}>Editar</Button>{' '}
                                <Button variant="danger" onClick={() => handleDelete(item[itemKey])}>Apagar</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
};

export default GenericTable;
