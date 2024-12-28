import React, { useEffect, useState } from 'react';
import { Grid, Card, CardContent, CardMedia, Typography, Box, TextField, Container } from '@mui/material';
import { toast } from 'react-toastify';
import Footer from '../components/ui/Footer';
import { getCharacters } from '../api/CharacterAPI';
import { useNavigate } from 'react-router-dom';
import getTypeText from '../enums/typeEnum';
import getRarityText from '../enums/rarityEnum';

const CharacterList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [characters, setCharacters] = useState([]);
  const navigate = useNavigate(); 

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const data = await getCharacters();
        const sortedCharacters = [...data].sort((a, b) =>
          a.name.localeCompare(b.name)
        );
        setCharacters(sortedCharacters);
      }
      catch (error) {
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

  const handleCardClick = (character) => {
    const typeText = getTypeText(character.type);
    const characterName = encodeURIComponent(character.name.toLowerCase().replace(/\s+/g, '-')); // Ensure the character name is URL-safe
    navigate(`/characters/${typeText}/${characterName}`);
  };

  function getNicknameInitials(nickname) {
    if (!nickname) return '';
    return nickname
      .split(/\s+|-/)  
      .map(word => word[0].toLowerCase())
      .join('');
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '95vh' }}>
      <Container maxWidth="100%" sx={{ paddingTop: 4 }}>
        <Box sx={{ marginTop: 4, width: '40%', alignContent: 'center', margin: 'auto' }}>
          <TextField
            label="Search Characters"
            variant="outlined"
            fullWidth
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </Box>

        <Grid container spacing={2} justifyContent="center">
          <Grid item xs={12}>
            <Box sx={{ height: '100%', overflowY: 'auto', padding: 1, display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
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
                    position: 'relative',
                    cursor: 'pointer',
                    '&:hover': {
                      boxShadow: '0px 4px 15px rgba(255, 255, 255, 0.2)',
                      transform: 'scale(1.05)',
                      transition: 'transform 0.3s, box-shadow 0.3s',
                    },
                  }}
                  onClick={() => handleCardClick(character)} 
                >
                  <CardMedia
                    component="img"
                    image={`https://localhost/images/characters/${getTypeText(character.type)}-${encodeURIComponent(character.name.toLowerCase().replace(/\s+/g, '-'))}-${getNicknameInitials(character.nickname)}-full.png`}
                    alt={character.name}
                    sx={{
                      height: '100%',
                      objectFit: 'cover',
                    }}
                  />

                  <CardContent sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', flex: 1, position: 'relative' }}>
                    <Box
                      sx={{
                        position: 'absolute',
                        top: 8,
                        left: 8,
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        color: 'white',
                        padding: '2px 6px',
                        borderRadius: '4px',
                      }}
                    >
                      <Typography variant="body2">{getRarityText(character.rarity)}</Typography>
                    </Box>

                    <Box
                      sx={{
                        position: 'absolute',
                        top: 8,
                        right: 8,
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        color: 'white',
                        padding: '2px 6px',
                        borderRadius: '4px',
                      }}
                    >
                      <Typography variant="body2">{getTypeText(character.type)}</Typography>
                    </Box>

                    <Typography variant="h6" align="center" sx={{ marginTop: 2 }}>
                      {character.name}
                    </Typography>
                  </CardContent>
                </Card>
              ))}
            </Box>
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </Box>
  );
};

export default CharacterList;
