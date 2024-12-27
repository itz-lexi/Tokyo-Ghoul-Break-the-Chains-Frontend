import React, { useState } from 'react';
import { Grid, Card, CardContent, CardMedia, Typography, Button, Box, Divider, TextField, Container } from '@mui/material';
import { toast } from 'react-toastify';
import Footer from '../components/ui/Footer';  // Import Footer component

const characters = [
  { id: 1, name: 'Kaneki Ken', image: '/kaneki_full.jpg', passives: ['Passive 1', 'Passive 2'], canBeBackup: true },
  { id: 2, name: 'Touka Kirishima', image: '/touka_full.jpg', passives: ['Passive 1', 'Passive 3'], canBeBackup: false },
  { id: 3, name: 'Rize Kamishiro', image: '/rize_full.jpg', passives: ['Passive 4', 'Passive 5'], canBeBackup: true },
  { id: 4, name: 'Uta', image: '/uta_full.jpg', passives: ['Passive 6', 'Passive 7'], canBeBackup: true },
];

const TeamBuilder = () => {
  const [selectedTeam, setSelectedTeam] = useState([]);
  const [backupUnit, setBackupUnit] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredCharacters = characters.filter((character) =>
    character.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelectCharacter = (character) => {
    if (selectedTeam.length < 4) {
      setSelectedTeam([...selectedTeam, character]);
    }
  };

  const handleRemoveCharacter = (character) => {
    setSelectedTeam(selectedTeam.filter((char) => char.id !== character.id));
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Container maxWidth="100%" sx={{ paddingTop: 4 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Team Builder
        </Typography>

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
              {selectedTeam.map((character) => (
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
                    image={character.image}
                    alt={character.name}
                    sx={{
                      height: 150,
                      width: '100%',
                      objectFit: 'cover',
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
              ))}

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
                <Card sx={{ width: 200, height: 280, border: '1px dashed #ccc', textAlign: 'center', padding: 2 }}>
                  <CardMedia
                    component="img"
                    image={backupUnit.image}
                    alt={backupUnit.name}
                    sx={{
                      height: 150,
                      width: '100%',
                      objectFit: 'cover',
                    }}
                  />
                  <CardContent sx={{ flex: 1 }}>
                    <Typography variant="h6">{backupUnit.name}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      Passives: {backupUnit.passives.join(', ')}
                    </Typography>
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
        <Box sx={{ marginTop: 4, width: '40%',alignContent: 'center', margin: 'auto' }}>
          <TextField
            label="Search Characters"
            variant="outlined"
            fullWidth
            value={searchTerm}
            onChange={handleSearchChange}
            sx={{ backgroundColor: '#fff' }}
          />
        </Box>

        {/* Available Characters Section */}
        <Grid container spacing={2} justifyContent="center">
          <Grid item xs={12}>
            <Typography variant="h5" align="center" gutterBottom sx={{ marginTop: 4 }}>
              Available Characters
            </Typography>
            <Box sx={{ height: '500px', overflowY: 'auto', padding: 1, display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
              {filteredCharacters.map((character) => (
                <Card
                  key={character.id}
                  sx={{
                    display: 'flex',
                    marginBottom: '1rem',
                    height: 400,
                    width: 240,
                    flexDirection: 'column',
                    margin: 5,
                    border: '1px solid #ccc',
                  }}
                >
                  <CardMedia
                    component="img"
                    image={character.image}
                    alt={character.name}
                    sx={{
                      height: '100%',
                      objectFit: 'cover',
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
                      onClick={() => setBackupUnit(character)}
                      sx={{ marginTop: 1 }}
                    >
                      Set as Backup
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </Box>
          </Grid>
        </Grid>
      </Container>

      {/* Footer */}
      <Footer /> {/* This will ensure the footer is at the bottom of the page */}
    </Box>
  );
};

export default TeamBuilder;
