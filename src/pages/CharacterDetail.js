import React from 'react';
import { useParams } from 'react-router-dom';

const CharacterDetails = () => {
  const { type, characterName } = useParams();

  const formatName = (input) => {
    return input
      .replace(/-/g, ' ')
      .replace(/([a-z])([A-Z])/g, '$1 $2')
      .replace(/\b\w/g, (char) => char.toUpperCase());
  };
  

  return (
    <div>
      <h1>Character Details</h1>
      <p>Type: {type.toUpperCase()}</p>
      <p>Name: {formatName(characterName)}</p>
    </div>
  );
};

export default CharacterDetails;
