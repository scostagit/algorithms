// api.js
import axios from 'axios';

const BASE_URL = 'https://api.restful-api.dev/objects';

export const getObjects = async () => {
  try {
    const response = await axios.get(BASE_URL);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch objects');
  }
};

export const getObjectById = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch object by ID');
  }
};

export const createObject = async (newObject) => {
  try {
    const response = await axios.post(BASE_URL, newObject, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    throw new Error('Failed to create object');
  }
};

export const updateObject = async (id, updatedObject) => {
  try {
    const response = await axios.put(`${BASE_URL}/${id}`, updatedObject, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    throw new Error('Failed to update object');
  }
};

export const deleteObject = async (id) => {
  try {
    await axios.delete(`${BASE_URL}/${id}`);
    return true;
  } catch (error) {
    throw new Error('Failed to delete object');
  }
};
