import React, { useEffect, useState } from 'react';
import { getViagens } from '../api';

const ViagemList = () => {
  const [viagens, setViagens] = useState([]);

  useEffect(() => {
    getViagens().then(response => setViagens(response.data));
  }, []);

  return (
    <div>
      <h2>Lista de Viagens</h2>
      <ul>
        {viagens.map(viagem => (
          <li key={viagem.id_da_Viagem}>
            {viagem.destino} - {viagem.data_de_Inicio} to {viagem.data_de_Fim}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ViagemList;
