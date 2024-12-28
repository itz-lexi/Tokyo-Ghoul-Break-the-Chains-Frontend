import React, { useEffect, useState } from 'react';
import {
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Box,
  Divider,
  TextField,
  Container,
} from '@mui/material';
import { toast } from 'react-toastify';
import Footer from '../components/ui/Footer';
import { getCharacters } from '../api/CharacterAPI';
import getTypeText from '../enums/typeEnum';
import CardComponent from '../components/ui/Card';
import { getPassives } from '../api/PassiveAPI';

const TeamBuilder = () => {
  const [selectedTeam, setSelectedTeam] = useState([]);
  const [backupUnit, setBackupUnit] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [characters, setCharacters] = useState([]);
  const [visibleCharacter, setVisibleCharacter] = useState(null);

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const data = await getCharacters();
        const sortedCharacters = [...data].sort((a, b) =>
          a.name.localeCompare(b.name)
        );
        setCharacters(sortedCharacters);
      } catch (error) {
        toast.error('Error fetching characters.');
      }
    };

    fetchCharacters();
  }, []);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredCharacters = characters.filter((character) =>
    character.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelectCharacter = (character) => {
    if (selectedTeam.length < 4) {
      setSelectedTeam([...selectedTeam, character]);
      setCharacters(characters.filter((char) => char.id !== character.id));
    } else {
      toast.error('You can only have 4 characters in your team.');
    }
  };

  const handleSelectBackup = (character) => {
    setBackupUnit(character);
    setCharacters(characters.filter((char) => char.id !== character.id));
  };

  const handleRemoveCharacter = (character) => {
    const updatedCharacters = [...characters, character].sort((a, b) =>
      a.name.localeCompare(b.name)
    );

    setSelectedTeam(selectedTeam.filter((char) => char.id !== character.id));
    setCharacters(updatedCharacters);
    if (character === backupUnit) {
      setBackupUnit(null);
    }
  };

  const handlePassiveDetails = async (character) => {
    if (visibleCharacter?.id === character.id) {
      setVisibleCharacter(null);
    } else {
      try {
        const passives = await getPassives(character.id);
        setVisibleCharacter({ ...character, passives });
      } catch (error) {
        toast.info('Character has no passives added yet.');
      }
    }
  };

  const getNicknameInitials = (nickname) => {
    if (!nickname) return '';
    return nickname
      .split(/\s+|-/)
      .map((word) => word[0].toLowerCase())
      .join('');
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '95vh' }}>
      <Container maxWidth="100%" sx={{ paddingTop: 4 }}>
        {/* Passive Details Box */}
        {visibleCharacter && (
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              border: '1px solid #555',
              padding: 3,
              zIndex: 1000,
              maxWidth: 400,
              backgroundColor: '#1e1e1e',
              color: '#fff',
              boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.5)',
              borderRadius: 4,
              textAlign: 'center',
            }}
          >
            <Typography variant="h6" sx={{ marginBottom: 2 }}>
              {visibleCharacter.name}'s Passives
            </Typography>
            <Divider sx={{ marginY: 2 }} />
            {visibleCharacter.passives && visibleCharacter.passives.length > 0 ? (
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'center',
                  flexWrap: 'wrap',
                  gap: 2,
                }}
              >
                {visibleCharacter.passives.map((passive, index) => (
                  <CardComponent
                    key={index}
                    title={passive.icon} // Use the icon name for the title
                    description={passive.description}
                    width={300}
                    height={120}
                    infoCentred={true}
                  />
                ))}
              </Box>
            ) : (
              <Typography variant="body1">No passives available for this character.</Typography>
            )}
            <Button
              variant="contained"
              color="secondary"
              sx={{ marginTop: 2 }}
              onClick={() => setVisibleCharacter(null)}
            >
              Close
            </Button>
          </Box>
        )}



        {/* Top Section: Team and Backup Unit */}
        <Grid container spacing={2} justifyContent="center" sx={{ marginBottom: 4 }}>
          {/* Team Section */}
          <Grid item xs={12} sm={6}>
            <Typography variant="h5" align="center" gutterBottom>
              Your Team
            </Typography>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                flexWrap: 'wrap',
                gap: 2,
                justifyContent: 'center',
                border: '1px solid #ccc',
                padding: 2,
                minHeight: 300,
              }}
            >
              {selectedTeam.map((character) => {
                const characterImage = `https://localhost/images/characters/${getTypeText(
                  character.type
                )}-${encodeURIComponent(
                  character.name.toLowerCase().replace(/\s+/g, '-')
                )}-${getNicknameInitials(character.nickname)}-full.png`;
                return (
                  <Card
                    key={character.id}
                    sx={{
                      width: 200,
                      height: 280,
                      border: '1px dashed #ccc',
                      textAlign: 'center',
                      padding: 2,
                    }}
                  >
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={(event) => handlePassiveDetails(character, event)}
                      sx={{ marginBottom: 2 }}
                    >
                      Passive Details
                    </Button>

                    <CardMedia
                      component="img"
                      image={characterImage}
                      alt={character.name}
                      sx={{
                        height: 150,
                        width: '100%',
                        objectFit: 'contain',
                        margin: 'auto',
                      }}
                    />
                    <CardContent sx={{ flex: 1 }}>
                      <Typography variant="h6">{character.name}</Typography>
                      <Button
                        variant="outlined"
                        color="secondary"
                        onClick={() => handleRemoveCharacter(character)}
                        sx={{ marginTop: 1 }}
                      >
                        Remove
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
              {/* Empty slots */}
              {Array.from({ length: 4 - selectedTeam.length }).map((_, index) => (
                <Card
                  key={index}
                  sx={{
                    width: 200,
                    height: 280,
                    border: '1px dashed #ccc',
                    textAlign: 'center',
                    padding: 2,
                  }}
                >
                  <CardContent>
                    <Typography variant="h6">+</Typography>
                  </CardContent>
                </Card>
              ))}
            </Box>
          </Grid>

          {/* Backup Unit Section */}
          <Grid item xs={12} sm={2}>
            <Typography variant="h5" align="center" gutterBottom>
              Backup Unit
            </Typography>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                minHeight: 200,
                border: '1px solid #ccc',
                padding: 2,
              }}
            >
              {backupUnit ? (
                <Card
                  sx={{
                    width: 200,
                    height: 280,
                    border: '1px dashed #ccc',
                    textAlign: 'center',
                    padding: 2,
                  }}
                >
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={(event) => handlePassiveDetails(backupUnit, event)}
                    sx={{ marginBottom: 2 }}
                  >
                    Passive Details
                  </Button>

                  <CardMedia
                    component="img"
                    image={`https://localhost/images/characters/${getTypeText(
                      backupUnit.type
                    )}-${encodeURIComponent(
                      backupUnit.name.toLowerCase().replace(/\s+/g, '-')
                    )}-${getNicknameInitials(backupUnit.nickname)}-full.png`}
                    alt={backupUnit.name}
                    sx={{
                      height: 150,
                      width: '100%',
                      objectFit: 'contain',
                      margin: 'auto',
                    }}
                  />
                  <CardContent sx={{ flex: 1 }}>
                    <Typography variant="h6">{backupUnit.name}</Typography>
                    <Button
                      variant="outlined"
                      color="secondary"
                      onClick={() => handleRemoveCharacter(backupUnit)}
                      sx={{ marginTop: 1 }}
                    >
                      Remove
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                <Card
                  sx={{
                    width: 200,
                    height: 280,
                    border: '1px dashed #ccc',
                    textAlign: 'center',
                    padding: 2,
                  }}
                >
                  <CardContent>
                    <Typography variant="h6">+</Typography>
                  </CardContent>
                </Card>
              )}
            </Box>
          </Grid>
        </Grid>

        {/* Divider */}
        <Divider sx={{ marginY: 4 }} />

        {/* Search Bar */}
        <Box
          sx={{
            marginTop: 4,
            width: '40%',
            alignContent: 'center',
            margin: 'auto',
          }}
        >
          <TextField
            label="Search Characters"
            variant="outlined"
            fullWidth
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </Box>

        {/* Available Characters Section */}
        <Grid container spacing={2} justifyContent="center">
          <Grid item xs={12}>
            <Typography
              variant="h5"
              align="center"
              gutterBottom
              sx={{ marginTop: 4 }}
            >
              Available Characters
            </Typography>
            <Box
              sx={{
                height: '450px',
                overflowY: 'auto',
                padding: 1,
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'center',
              }}
            >
              {filteredCharacters.map((character) => {
                const characterImage = `https://localhost/images/characters/${getTypeText(
                  character.type
                )}-${encodeURIComponent(
                  character.name.toLowerCase().replace(/\s+/g, '-')
                )}-${getNicknameInitials(character.nickname)}-full.png`;
                return (
                  <Card
                    key={character.id}
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      margin: 5,
                      border: '1px solid #ccc',
                      position: 'relative',
                      width: 240,
                      padding: 2,
                    }}
                  >
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={(event) => handlePassiveDetails(character, event)}
                      sx={{ marginBottom: 2 }}
                    >
                      Passive Details
                    </Button>

                    <CardMedia
                      component="img"
                      image={characterImage}
                      alt={character.name}
                      sx={{
                        height: 170,
                        width: 'auto',
                        objectFit: 'contain',
                        margin: 'auto',
                      }}
                    />
                    <CardContent
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'flex-end',
                        flex: 1,
                      }}
                    >
                      <Typography variant="h6" align="center">
                        {character.name}
                      </Typography>
                      <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        onClick={() => handleSelectCharacter(character)}
                        sx={{ marginTop: 2 }}
                      >
                        Add to Team
                      </Button>
                      <Button
                        variant="outlined"
                        color="secondary"
                        fullWidth
                        onClick={() => handleSelectBackup(character)}
                        sx={{ marginTop: 1 }}
                      >
                        Set as Backup
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </Box>
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </Box>
  );
};

export default TeamBuilder;
