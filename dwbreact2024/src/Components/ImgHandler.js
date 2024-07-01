import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { saveImage } from '../Services/api';

const ImgHandler = ({ onUploadSuccess }) => {
    const [errors, setErrors] = useState({});
    const [imageFile, setImageFile] = useState(null);

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        setImageFile(file);
    };

    const saveImageToServer = async () => {
        if (!imageFile) {
            setErrors({ image: ["Por favor, selecione uma imagem"] });
            return;
        }

        const reader = new FileReader();

        reader.onloadend = async () => {
            const base64String = reader.result.replace("data:", "").replace(/^.+,/, "");
            try {
                const response = await saveImage(base64String);
                if (response.status === 200) {
                    console.log('Imagem guardada com sucesso!');
                    onUploadSuccess();
                    setErrors({});
                }
            } catch (error) {
                if (error.response && error.response.data) {
                    setErrors(error.response.data.errors || {});
                } else {
                    console.error('Erro ao guardar a imagem:', error);
                }
            }
        };

        reader.readAsDataURL(imageFile);
    };

    return (
        <div>
            <input type="file" accept="image/*" onChange={handleImageUpload} />
            {errors.image && <div style={{ color: 'red' }}>{errors.image.join(', ')}</div>}
            <Button variant="primary" onClick={saveImageToServer}>Upload</Button>
        </div>
    );
};

export default ImgHandler;