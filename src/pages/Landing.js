import React from 'react';
import { Container, Grid, Typography } from '@mui/material';
import CardComponent from '../components/ui/Card';
import Footer from '../components/ui/Footer';

const Landing = () => {
  const cardData = [
    //Card 1
    { title: 'Welcome to BTC Database', description: `BTC Database contains all the latest and up to date information about the mobile game
       Tokyo Ghoul: Break the Chains. This website is being developed by Lex of Soul Society in EU-067. All characters, equipment, and information are taken from EU-001
       Please keep in mind you might not see some of these characters for a long time depending on what server you are playing on.
       Additionally, credit to this idea goes to the creators of the GCDatabase as I felt inspired by them to create this website for the game I am passionate about.`,
       infoCentred: true },
    //Card 2
    { title: 'Latest News',
    images: ['',''], 
    infoCentred: true, characterCard: true },
    //Card 3
    { title: 'Newest Character(s)', infoCentred: true, characterCard: true },
    //Card 4
    { title: 'Newest Banner', infoCentred: true, characterCard: true },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Container maxWidth="lg" sx={{ padding: '2rem' }}>
        <Typography variant="h3" align="center" gutterBottom>
          Tokyo Ghoul: Break the Chains Database
        </Typography>
        <Grid container spacing={4} sx={{ justifyContent: 'flex-start', flexWrap: 'wrap' }}>
          {cardData.map((data) => (
            <Grid item key={data.id} sx={{ flex: '1 0 300px', padding: '10px' }}>
              <CardComponent {...data} width={1200} height={180} />
            </Grid>
          ))}
        </Grid>
      </Container>
      <Footer />
    </div>
  );
};

export default Landing;
