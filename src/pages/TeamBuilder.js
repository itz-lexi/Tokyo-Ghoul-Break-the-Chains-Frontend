import React, { useEffect, useState } from 'react';
import { Grid, Card, CardContent, CardMedia, Typography, Button, Box, Divider, TextField, Container } from '@mui/material';
import { toast } from 'react-toastify';
import Footer from '../components/ui/Footer';
import { getCharacters } from '../api/CharacterAPI';
import getTypeText from '../enums/typeEnum';

const TeamBuilder = () => {
  const [selectedTeam, setSelectedTeam] = useState([]);
  const [backupUnit, setBackupUnit] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [characters, setCharacters] = useState([]);

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

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '95vh' }}>
      <Container maxWidth="100%" sx={{ paddingTop: 4 }}>

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
                const characterImage = `https://localhost/images/characters/${getTypeText(character.type)}-${encodeURIComponent(character.name.toLowerCase().replace(/\s+/g, '-'))}-full.png`;
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
                    <CardMedia
                      component="img"
                      image={characterImage}
                      alt={character.name}
                      sx={{
                        height: 150,
                        width: '100%',
                        objectFit: 'contain',  // Ensures image is centered and fits within the space
                        margin: 'auto',  // Centers the image horizontally
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

              {/* Empty boxes to fill remaining slots (max 4 slots) */}
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
                  <CardMedia
                    component="img"
                    image={`https://localhost/images/characters/${getTypeText(backupUnit.type)}-${encodeURIComponent(backupUnit.name.toLowerCase().replace(/\s+/g, '-'))}-full.png`}
                    alt={backupUnit.name}
                    sx={{
                      height: 150,
                      width: '100%',
                      objectFit: 'contain',  // Same centering and fitting logic for backup
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
                <Card sx={{ width: 200, height: 280, border: '1px dashed #ccc', textAlign: 'center', padding: 2 }}>
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
        <Box sx={{ marginTop: 4, width: '40%', alignContent: 'center', margin: 'auto' }}>
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
            <Typography variant="h5" align="center" gutterBottom sx={{ marginTop: 4 }}>
              Available Characters
            </Typography>
            <Box sx={{ height: '450px', overflowY: 'auto', padding: 1, display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
              {filteredCharacters.map((character) => {
                const characterImage = `https://localhost/images/characters/${getTypeText(character.type)}-${encodeURIComponent(character.name.toLowerCase().replace(/\s+/g, '-'))}-full.png`;
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
                    <CardMedia
                      component="img"
                      image={characterImage}
                      alt={character.name}
                      sx={{
                        height: 170,
                        width: 'auto',
                        objectFit: 'contain',  // Centered image in all places
                        margin: 'auto',  // Centers image horizontally
                      }}
                    />

                    <CardContent sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', flex: 1 }}>
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
