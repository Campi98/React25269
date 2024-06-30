import React, { useEffect, useState } from 'react';
import { Table, Button, Modal } from 'react-bootstrap';
import api from '../api';
import ImgHandler from './ImgHandler';

const ImagensTable = () => {
    const [imagens, setImagens] = useState([]);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        fetchImagens();
    }, []);

    const fetchImagens = async () => {
        try {
            const response = await api.get('/imagens');
            setImagens(response.data);
        } catch (error) {
            console.error('Erro ao dar fetch às imagens:', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await api.delete(`/imagens/${id}`);
        } catch (error) {
            console.error('Erro ao eliminar a imagem:', error);
        } finally {
            fetchImagens();
        }
    };

    const handleUploadSuccess = () => {
        fetchImagens();
        setShowModal(false);
    };

    return (
        <div>
            <Button variant="primary" onClick={() => setShowModal(true)}>Upload Nova Imagem</Button>
            
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Upload Nova Imagem</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <ImgHandler onUploadSuccess={handleUploadSuccess} />
                </Modal.Body>
            </Modal>
            
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Imagem</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {imagens.map(imagem => (
                        <tr key={imagem.id}>
                            <td>{imagem.id}</td>
                            <td>
                                <img src={`data:image/jpeg;base64,${imagem.base64String}`} alt="Imagem" style={{width: '100px', height: '100px'}} />
                            </td>
                            <td>
                                <Button variant="danger" onClick={() => handleDelete(imagem.id)}>Apagar</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
};

export default ImagensTable;
