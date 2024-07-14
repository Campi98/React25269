import React, { useEffect, useState } from 'react';
import { Box, Typography, Button, CssBaseline, Divider, TextField, MenuItem, Select } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Modal } from 'react-bootstrap';
import { useAuth } from '../Components/LoginAuth/AuthContext';
import AuthenticatedAppBar from '../Components/CompLP/AuthenticatedAppBar';
import getLPTheme from './LandingPage/getLPTheme';
import { getUsers, getUserProfile, updatePerfil, getGruposDeViagem, updateUser, createGrupoDeViagem } from '../Services/api';
import UserProfileImgHandler from '../Components/UserProfileImgHandler';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';

const UserProfile = () => {
  const { isAuthenticated, userEmail } = useAuth();
  const [mode, setMode] = useState('dark');
  const [userData, setUserData] = useState(null);
  const [profileData, setProfileData] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedInterests, setEditedInterests] = useState('');
  const [editedDestinations, setEditedDestinations] = useState('');
  const [groups, setGroups] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState('');
  const [showCreateGroupModal, setShowCreateGroupModal] = useState(false);
  const [newGroupName, setNewGroupName] = useState('');
  const [newGroupDestination, setNewGroupDestination] = useState('');
  const [newGroupStartDate, setNewGroupStartDate] = useState('');
  const [newGroupEndDate, setNewGroupEndDate] = useState('');
  const [newGroupDescription, setNewGroupDescription] = useState('');
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
            setSelectedGroup(user.iD_do_Grupo);
          }).catch(profileError => {
            console.error('Error fetching profile data:', profileError);
          });
          getGruposDeViagem().then(groupsResponse => {
            setGroups(groupsResponse.data);
          }).catch(groupsError => {
            console.error('Error fetching groups data:', groupsError);
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
    if (profileData && userData) {
      const updatedProfile = {
        ...profileData,
        interesses_de_Viagem: editedInterests,
        destinos_Favoritos: editedDestinations,
        iD_do_Grupo: selectedGroup,
      };
      const updatedUser = {
        ...userData,
        iD_do_Grupo: selectedGroup,
      };
      try {
        await updatePerfil(profileData.iD_do_Perfil, updatedProfile);
        await updateUser(userData.iD_do_User, updatedUser);
        setProfileData(updatedProfile);
        setUserData(updatedUser);
        setIsEditing(false);
      } catch (error) {
        console.error('Error updating profile:', error);
      }
    }
  };

  const handleCreateGroup = async () => {
    const newGroup = {
      nome_do_Grupo: newGroupName,
      destino: newGroupDestination,
      data_de_Inicio: newGroupStartDate,
      data_de_Fim: newGroupEndDate,
      descricao: newGroupDescription,
    };
    try {
      const response = await createGrupoDeViagem(newGroup);
      setGroups([...groups, response.data]);
      setShowCreateGroupModal(false);
    } catch (error) {
      console.error('Error creating new group:', error);
    }
  };

  const getGroupNameById = (groupId) => {
    const group = groups.find(group => group.iD_do_Grupo === groupId);
    return group ? group.nome_do_Grupo : 'No group found';
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
                        <Typography variant="body1">Grupo de Viagem:</Typography>
                        <Select
                          value={selectedGroup}
                          onChange={(e) => setSelectedGroup(e.target.value)}
                          fullWidth
                          sx={{ marginY: 2 }}
                        >
                          {groups.map((group) => (
                            <MenuItem key={group.iD_do_Grupo} value={group.iD_do_Grupo}>
                              {group.nome_do_Grupo}
                            </MenuItem>
                          ))}
                        </Select>
                        <Button variant="contained" color="primary" onClick={handleSaveChanges} startIcon={<SaveIcon />} sx={{ marginTop: 2 }}>
                          Save Changes
                        </Button>
                      </>
                    ) : (
                      <>
                        <Typography variant="body1">Interesses de Viagem: {profileData.interesses_de_Viagem}</Typography>
                        <Typography variant="body1">Destinos Favoritos: {profileData.destinos_Favoritos}</Typography>
                        <Typography variant="body1">ID do Grupo: {userData.iD_do_Grupo}</Typography>
                        <Typography variant="body1">Nome do Grupo: {getGroupNameById(userData.iD_do_Grupo)}</Typography>
                        <Button variant="contained" color="primary" onClick={() => setIsEditing(true)} startIcon={<EditIcon />} sx={{ marginTop: 2 }}>
                          Edit
                        </Button>
                      </>
                    )}
                    <Button variant="contained" color="secondary" onClick={() => setShowCreateGroupModal(true)} sx={{ marginTop: 2 }}>
                      Add New Grupo de Viagem
                    </Button>
                  </>
                ) : (
                  <Typography variant="body1">Loading profile data...</Typography>
                )}
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

        <Modal show={showCreateGroupModal} onHide={() => setShowCreateGroupModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Create New Grupo de Viagem</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <TextField
              label="Nome do Grupo"
              value={newGroupName}
              onChange={(e) => setNewGroupName(e.target.value)}
              fullWidth
              sx={{ marginY: 2 }}
            />
            <TextField
              label="Destino"
              value={newGroupDestination}
              onChange={(e) => setNewGroupDestination(e.target.value)}
              fullWidth
              sx={{ marginY: 2 }}
            />
            <TextField
              label="Data de Início"
              type="date"
              value={newGroupStartDate}
              onChange={(e) => setNewGroupStartDate(e.target.value)}
              fullWidth
              sx={{ marginY: 2 }}
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              label="Data de Fim"
              type="date"
              value={newGroupEndDate}
              onChange={(e) => setNewGroupEndDate(e.target.value)}
              fullWidth
              sx={{ marginY: 2 }}
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              label="Descrição"
              value={newGroupDescription}
              onChange={(e) => setNewGroupDescription(e.target.value)}
              fullWidth
              multiline
              sx={{ marginY: 2 }}
            />
            <Button variant="contained" color="primary" onClick={handleCreateGroup} sx={{ marginTop: 2 }}>
              Create Grupo
            </Button>
          </Modal.Body>
        </Modal>
      </Box>
    </ThemeProvider>
  );
};

export default UserProfile;
