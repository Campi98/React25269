import React, { useState } from 'react';

// Importe as dependências necessárias

// Componente de criação de tarefas
const CreateTarefa = () => {
    // Estado para armazenar o arquivo selecionado
    const [file, setFile] = useState(null);

    // Manipulador de envio de arquivo
    const handleFileSubmit = (event) => {




        const formData = new FormData();
        formData.append('file', file);

        fetch('http://localhost:3001/upload', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(result => {
            console.log('Success:', result);
        })
        .catch(error => {

            

        // Obtém o arquivo selecionado
        const selectedFile = event.target.files[0];
        
        // Faça o que for necessário com o arquivo selecionado
        // Por exemplo, você pode fazer o upload do arquivo para um servidor

        // Atualize o estado do arquivo
        setFile(selectedFile);
    };

    return (
        <div>
            <h2>Criar Tarefa</h2>
            <form>
                <div>
                    input que guarde coisos no state
                    <label htmlFor="fileInput">Selecione um arquivo:</label>
                    <input type="file" id="fileInput" onChange={handleFileSubmit} />
                </div>
                <button type="submit">Criar</button>
            </form>
        </div>
    );
};

export default CreateTarefa;