import React from 'react';
import { Card, CardContent, CardMedia, Typography, Button, CardActionArea } from '@mui/material';
import { Link } from 'react-router-dom';

const CardComponent = ({ 
  title,
  description,
  images = [],
  infoCentred,
  characterCard = false,
  width = 350, height = 180,
  imageWidth = width - 20,
  imageHeight = height,
  imageTitle
  }) => {

    const handleOnClick = () => {
        
    };
    
    return (
    <Card sx={{ width: width, display: 'flex', flexDirection: 'column', height: '100%' }}>
        {imageTitle && (
          <Typography variant="h5" component="div" sx={{ padding: '10px', textAlign: 'center', marginTop: 2, marginBottom: 2 }}>
            {imageTitle}
          </Typography>
        )}
        {images && images.length > 0 && images.map((image, index) => (
          <CardMedia
            key={index}
            component="img"
            sx={{
              height: imageHeight,
              width: imageWidth,
              padding: '10px',
              objectFit: 'cover',
            }}
            image={image}
            alt={`${title} - Image ${index + 1}`}
            onClick={() => console.log('Image clicked')}
          />
        ))}
        
        <CardContent sx={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
          <Typography variant="h5" component="div" sx={{
              textAlign: infoCentred ? 'center' : 'left',
            }}>
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ flex: 1, textAlign: infoCentred ? 'center' : 'left', marginTop: 2 }}>
            {description}
          </Typography>
        </CardContent>

        {characterCard && (
          <Button size="small" color="secondary" sx={{ margin: '1rem', width: 'fit-content', alignSelf: 'center' }}>
            <Link to={`/characters/${title.toLowerCase().replace(' ', '-')}`} style={{ textDecoration: 'none', color: 'inherit' }}>
              Learn More
            </Link>
          </Button>
        )}
    </Card>
  );
};

export default CardComponent;
