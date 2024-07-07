import React, { useEffect, useState } from 'react';
import { useAuth } from '../Components/LoginAuth/AuthContext';
import { checkAuthStatus } from '../Services/api';

const UserStatus = () => {
  const { isAuthenticated, logout } = useAuth();
  const [status, setStatus] = useState(null);

  useEffect(() => {
    checkAuthStatus()
      .then(response => {
        setStatus(response.data.isAuthenticated);
      })
      .catch(error => {
        console.error('Failed to fetch user status', error);
      });
  }, [isAuthenticated]);

  if (status === null) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {status ? (
        <div>
          <p>Logged in</p>
          <button onClick={logout}>Logout</button>
        </div>
      ) : (
        <div>Not logged in</div>
      )}
    </div>
  );
};

export default UserStatus;
