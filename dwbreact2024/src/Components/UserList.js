import React, { useEffect, useState } from 'react';
import { getUsers } from '../api';

const UserList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUsers().then(response => setUsers(response.data));
  }, []);

  return (
    <div>
      <h2>Lista de Utilizadores</h2>
      <ul>
        {users.map(user => (
          <li key={user.id_do_User}>{user.nome} - {user.email}</li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
