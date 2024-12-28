import axios from 'axios';

const api = axios.create({
  baseURL: 'https://localhost:7175',
});

export const getPassives = async (characterId) => {
    try {
        const response = await api.get(`/Characters/${characterId}/Passives`);
        return response.data;
    } 
    catch (error) {
        console.error('Error fetching passives:', error);
        throw error;
    }
};
