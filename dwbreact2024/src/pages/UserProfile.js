import React, { useEffect, useState } from 'react';
import { Box, Typography, Button, CssBaseline, Divider } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { useAuth } from '../Components/LoginAuth/AuthContext';
import AuthenticatedAppBar from '../Components/CompLP/AuthenticatedAppBar';
import getLPTheme from './LandingPage/getLPTheme';
import { getUsers, getUserProfile } from '../Services/api';


const UserProfile = () => {
  const { isAuthenticated, userEmail, logout } = useAuth();
  const [mode, setMode] = React.useState('dark');
  const [userData, setUserData] = useState(null);
  const [profileData, setProfileData] = useState(null);
  const LPtheme = createTheme(getLPTheme(mode));

  useEffect(() => {
    if (userEmail) {
      getUsers().then(response => {
        const user = response.data.find(u => u.email === userEmail);
        setUserData(user);
        console.log('Fetched user data:', user); // debug
        if (user) {
          getUserProfile(user.iD_do_User).then(profileResponse => {
            setProfileData(profileResponse.data);
            console.log('Fetched profile data:', profileResponse.data); // debug
          }).catch(profileError => {
            console.error('Error fetching profile data:', profileError);
          });
        }
      }).catch(error => {
        console.error('Error fetching user data:', error);
      });
    }
  }, [userEmail]);

  const toggleColorMode = () => {
    setMode((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (
    <ThemeProvider theme={LPtheme}>
      <CssBaseline />
      <AuthenticatedAppBar mode={mode} toggleColorMode={toggleColorMode} />
      <Box sx={{ bgcolor: 'background.default', padding: 10 }}>
        <Typography variant="h4" gutterBottom>
          Perfil de Utilizador
        </Typography>
        <Divider sx={{ marginBottom: 2 }} />
        {isAuthenticated ? (
          <Box>
            {userData ? (
              <>
                <Typography variant="h6">Conta: {userData.email}</Typography>
                <Divider sx={{ marginY: 2 }} />
                <Typography variant="body1">Nome: {userData.nome}</Typography>
                <Typography variant="body1">Tipo: {userData.tipo}</Typography>
                <Divider sx={{ marginY: 2 }} />
                {profileData ? (
                  <>
                    <Typography variant="body1">Foto de Perfil: {profileData.fotografia_do_User}</Typography>
                    <Typography variant="body1">Interesses de Viagem: {profileData.interesses_de_Viagem}</Typography>
                    <Typography variant="body1">Destinos Favoritos: {profileData.destinos_Favoritos}</Typography>
                    <Typography variant="body1">Nível de Experiência em Viagens: {profileData.nivel_de_Experiencia_em_Viagens}</Typography>
                  </>
                ) : (
                  <Typography variant="body1">Loading profile data...</Typography>
                )}
                <Button variant="contained" color="primary" onClick={logout} sx={{ marginTop: 2 }}>
                  Logout
                </Button>
              </>
            ) : (
              <Typography variant="body1">Loading user data...</Typography>
            )}
          </Box>
        ) : (
          <Typography variant="h6">You are not logged in.</Typography>
        )}
      </Box>
    </ThemeProvider>
  );
};

export default UserProfile;
