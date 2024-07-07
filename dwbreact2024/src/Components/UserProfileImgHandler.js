import React, { useState } from 'react';
import { Button } from 'react-bootstrap';

const UserProfileImgHandler = ({ onUploadSuccess, handleSaveImage }) => {
    const [errors, setErrors] = useState({});
    const [imageFile, setImageFile] = useState(null);

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        setImageFile(file);
    };

    const saveImageToServer = async () => {
        if (!imageFile) {
            setErrors({ image: ["Please select an image"] });
            return;
        }

        const reader = new FileReader();

        reader.onloadend = async () => {
            const base64String = reader.result.replace("data:", "").replace(/^.+,/, "");
            try {
                await handleSaveImage(base64String);
                console.log('Image saved successfully!');
                onUploadSuccess();
                setErrors({});
            } catch (error) {
                setErrors({ image: ['Error saving the image'] });
                console.error('Error saving the image:', error);
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

export default UserProfileImgHandler;
