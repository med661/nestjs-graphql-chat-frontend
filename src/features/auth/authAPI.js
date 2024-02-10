import axios from 'axios';

const API_URL = 'http://localhost:5000/user'; // replace with your API endpoint

export const login = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { email, password });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message)

  }

};

export const register = async (password, email, name) => {
  try {
    const response = await axios.post(`${API_URL}/signup`, { password, email, name });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message)
  }

};