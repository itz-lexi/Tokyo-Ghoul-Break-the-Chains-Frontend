import axios from 'axios';

const api = axios.create({
  baseURL: 'https://localhost:7175',
});

export const getCharacters = async () => {
  try {
    const response = await api.get('/Characters/GetCharacters');
    return response.data;
  } catch (error) {
    console.log('Error fetching characters:', error);
    throw error;
  }
};
