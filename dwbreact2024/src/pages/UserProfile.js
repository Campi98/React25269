import React, { useEffect, useState } from 'react';
import { Box, Typography, Button, CssBaseline, Divider, TextField } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Modal } from 'react-bootstrap';
import { useAuth } from '../Components/LoginAuth/AuthContext';
import AuthenticatedAppBar from '../Components/CompLP/AuthenticatedAppBar';
import getLPTheme from './LandingPage/getLPTheme';
import { getUsers, getUserProfile, updatePerfil } from '../Services/api';
import UserProfileImgHandler from '../Components/UserProfileImgHandler';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';

const UserProfile = () => {
  const { isAuthenticated, userEmail, logout } = useAuth();
  const [mode, setMode] = useState('dark');
  const [userData, setUserData] = useState(null);
  const [profileData, setProfileData] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedInterests, setEditedInterests] = useState('');
  const [editedDestinations, setEditedDestinations] = useState('');
  const LPtheme = createTheme(getLPTheme(mode));

  useEffect(() => {
    if (userEmail) {
      getUsers().then(response => {
        const user = response.data.find(u => u.email === userEmail);
        setUserData(user);
        if (user) {
          getUserProfile(user.iD_do_User).then(profileResponse => {
            setProfileData(profileResponse.data);
            setEditedInterests(profileResponse.data.interesses_de_Viagem);
            setEditedDestinations(profileResponse.data.destinos_Favoritos);
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
        console.log(`Attempting to update profile for profile ID ${profileData.iD_do_Perfil} with data:`, updatedProfile);
        await updatePerfil(profileData.iD_do_Perfil, updatedProfile);
        handleUploadSuccess();
      } catch (error) {
        console.error('Error updating profile image:', error);
      }
    }
  };

  const handleSaveChanges = async () => {
    if (profileData) {
      const updatedProfile = {
        ...profileData,
        interesses_de_Viagem: editedInterests,
        destinos_Favoritos: editedDestinations,
      };
      try {
        await updatePerfil(profileData.iD_do_Perfil, updatedProfile);
        setProfileData(updatedProfile);
        setIsEditing(false);
      } catch (error) {
        console.error('Error updating profile:', error);
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
                    {isEditing ? (
                      <>
                        <TextField
                          label="Interesses de Viagem"
                          value={editedInterests}
                          onChange={(e) => setEditedInterests(e.target.value)}
                          fullWidth
                          multiline
                          sx={{ marginY: 2 }}
                        />
                        <TextField
                          label="Destinos Favoritos"
                          value={editedDestinations}
                          onChange={(e) => setEditedDestinations(e.target.value)}
                          fullWidth
                          multiline
                          sx={{ marginY: 2 }}
                        />
                        <Button variant="contained" color="primary" onClick={handleSaveChanges} startIcon={<SaveIcon />} sx={{ marginTop: 2 }}>
                          Save Changes
                        </Button>
                      </>
                    ) : (
                      <>
                        <Typography variant="body1">Interesses de Viagem: {profileData.interesses_de_Viagem}</Typography>
                        <Typography variant="body1">Destinos Favoritos: {profileData.destinos_Favoritos}</Typography>
                        <Button variant="contained" color="primary" onClick={() => setIsEditing(true)} startIcon={<EditIcon />} sx={{ marginTop: 2 }}>
                          Edit
                        </Button>
                      </>
                    )}
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
