import axios from 'axios';
import { Astronaut } from '../types/astronautTypes';

const BASE_URL = 'http://localhost:3001';
export const fetchAstronauts = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/api/astronauts`);
    console.log(response.data);
    return response.data.astronauts;
  } catch (error) {
    console.error('Error fetching astronauts!');
    throw error;
  }
};

export const createAstronaut = async (createData: Astronaut) => {
  try {
    const response = await axios.post(`${BASE_URL}/api/astronaut`, createData);

    if (response.status === 201) {
      console.log('Astronaut created successfully');
      return response;
    } else {
      throw new Error('Failed to create astronaut');
    }
  } catch (error) {
    console.error('Error creating astronauts!');
    throw error;
  }
};


export const updateAstronaut = async (id: number, updatedData: Astronaut) => {
  try {
    const response = await axios.put(`${BASE_URL}/api/astronaut/${id}`, updatedData);
    console.log(`Astronaut with id ${id} was updated successfully`);
    return response;
  } catch (error) {
    console.error('Error updating astronaut!');
    throw error;
  }
};

export const deleteAstronaut = async (id: number) => {
  try {
    const response = await axios.delete(`${BASE_URL}/api/astronaut/${id}`);
    console.log(`Astronaut with id ${id} deleted successfully`);
    return response;
  } catch (error) {
    console.error('Error deleting astronaut!');
    throw error;
  }
};
