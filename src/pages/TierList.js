import React from 'react';
import { Container, Grid, Typography } from '@mui/material';
import CardComponent from '../components/ui/Card';
import Footer from '../components/ui/Footer';

const TierList = () => {
  const cardData = [
    //Card 1
    { imageTitle: 'Conqueror Battle : Yaomori ( Jason )', images: [''],
       infoCentred: true },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '95vh' }}>
      <Container maxWidth="lg" sx={{ padding: '2rem' }}>
        <Typography variant="h3" align="center" gutterBottom>
          Tier List
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

export default TierList;
