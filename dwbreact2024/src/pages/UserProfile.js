import React, { useEffect, useState } from 'react';
import { Box, Typography, Button, CssBaseline, Divider } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Modal } from 'react-bootstrap';
import { useAuth } from '../Components/LoginAuth/AuthContext';
import AuthenticatedAppBar from '../Components/CompLP/AuthenticatedAppBar';
import getLPTheme from './LandingPage/getLPTheme';
import { getUsers, getUserProfile, updatePerfil } from '../Services/api';
import UserProfileImgHandler from '../Components/UserProfileImgHandler';

const UserProfile = () => {
  const { isAuthenticated, userEmail, logout } = useAuth();
  const [mode, setMode] = useState('dark');
  const [userData, setUserData] = useState(null);
  const [profileData, setProfileData] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const LPtheme = createTheme(getLPTheme(mode));

  useEffect(() => {
    if (userEmail) {
      getUsers().then(response => {
        const user = response.data.find(u => u.email === userEmail);
        setUserData(user);
        if (user) {
          getUserProfile(user.iD_do_User).then(profileResponse => {
            setProfileData(profileResponse.data);
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

  const handleUploadSuccess = () => {
    if (userData) {
      getUserProfile(userData.iD_do_User).then(profileResponse => {
        setProfileData(profileResponse.data);
        setShowModal(false);
      }).catch(profileError => {
        console.error('Error fetching profile data:', profileError);
      });
    }
  };

  const handleSaveImageForUserProfile = async (base64String) => {
    if (profileData && userData) {
      const updatedProfile = {
        ...profileData,
        fotografia_do_User: base64String,
      };
      try {
        console.log(`Attempting to update profile for profile ID ${profileData.iD_do_Perfil} with data:`, updatedProfile); // Logging for debugging
        await updatePerfil(profileData.iD_do_Perfil, updatedProfile); // Use iD_do_Perfil here
        handleUploadSuccess(); // Fetch the updated profile data after saving the image
      } catch (error) {
        console.error('Error updating profile image:', error);
      }
    }
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
                    <Typography variant="body1">Foto de Perfil:</Typography>
                    {profileData.fotografia_do_User ? (
                      <img src={`data:image/jpeg;base64,${profileData.fotografia_do_User}`} alt="Profile" style={{ width: '100px', height: '100px' }} />
                    ) : (
                      <Typography variant="body1">No profile photo available.</Typography>
                    )}
                    <Button variant="contained" color="primary" onClick={() => setShowModal(true)}>
                      Upload New Photo
                    </Button>
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

        <Modal show={showModal} onHide={() => setShowModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Upload New Profile Photo</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <UserProfileImgHandler onUploadSuccess={handleUploadSuccess} handleSaveImage={handleSaveImageForUserProfile} />
          </Modal.Body>
        </Modal>
      </Box>
    </ThemeProvider>
  );
};

export default UserProfile;
