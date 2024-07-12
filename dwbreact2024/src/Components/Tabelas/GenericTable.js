import React, { useEffect, useState } from 'react';
import { Table, Button, Modal, Form, Alert } from 'react-bootstrap';

const GenericTable = ({ fetchData, createData, updateData, deleteData, formFields, tableHeaders, tableRowData, itemKey, itemName, viagem }) => {
    const [items, setItems] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [currentItem, setCurrentItem] = useState({});
    const [errors, setErrors] = useState({});

    const fetchItems = async () => {
        try {
            if(viagem){
                const response = await fetchData(viagem);
                setItems(response.data);
                console.log(response.data);
            }else{
            const response = await fetchData();
            setItems(response.data);
            }
        } catch (error) {
            console.error(`Error fetching ${itemName.toLowerCase()}s:`, error);
            setErrors({ fetch: `Error fetching ${itemName.toLowerCase()}s: ${error.message}` });
        }
    };

    useEffect(() => {
        fetchItems();
    }, []);

    const handleDelete = async (id) => {
        try {
            await deleteData(id);
            fetchItems();
        } catch (error) {
            console.error(`Error deleting ${itemName.toLowerCase()}:`, error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCurrentItem({ ...currentItem, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isEditing) {
                await updateData(currentItem[itemKey], currentItem);
            } else {
                await createData(currentItem);
            }
            fetchItems();
            setShowModal(false);
            setErrors({});
        } catch (error) {
            console.error(`Error creating/updating ${itemName.toLowerCase()}:`, error);
            setErrors({ submit: `Error creating/updating ${itemName.toLowerCase()}: ${error.message}` });
        }
    };

    const handleEdit = (item) => {
        setCurrentItem(item);
        setIsEditing(true);
        setShowModal(true);
    };

    return (
        <div>
            <Button variant="primary" onClick={() => { setIsEditing(false); setCurrentItem({}); setShowModal(true); }}>Create New {itemName}</Button>
            
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>{isEditing ? `Edit ${itemName}` : `Create New ${itemName}`}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {errors.fetch && <Alert variant="danger">{errors.fetch}</Alert>}
                    {Object.keys(errors).length > 0 && !errors.fetch && (
                        <Alert variant="danger">
                            <ul>
                                {Object.keys(errors).map((key, index) => (
                                    <li key={index}>{errors[key]}</li>
                                ))}
                            </ul>
                        </Alert>
                    )}
                    <Form onSubmit={handleSubmit}>
                        {formFields.map((field, index) => (
                            <Form.Group controlId={`form${field.name}`} key={index}>
                                <Form.Label>{field.label}</Form.Label>
                                <Form.Control
                                    type={field.type}
                                    name={field.name}
                                    value={currentItem[field.name] || ''}
                                    onChange={handleInputChange}
                                    required
                                />
                            </Form.Group>
                        ))}
                        <Button variant="primary" type="submit">
                            {isEditing ? 'Save Changes' : 'Create'}
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
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map(item => (
                        <tr key={item[itemKey]}>
                            {tableRowData.map((field, index) => (
                                <td key={index}>{item[field]}</td>
                            ))}
                            <td>
                                <Button variant="warning" onClick={() => handleEdit(item)}>Edit</Button>{' '}
                                <Button variant="danger" onClick={() => handleDelete(item[itemKey])}>Delete</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
};

export default GenericTable;
