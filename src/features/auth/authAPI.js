import axios from 'axios';

const API_URL = 'http://localhost:5000/user'; // replace with your API endpoint

export const login = async (email, password) => {
  try {
    console.log('login');
    console.log(email, password);
    const response = await axios.post(`${API_URL}/login`, { email, password });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log({ error: "api error login" + error })
    console.log({ error: error.response.data.message })
    throw new Error(error.response.data.message)

  }

};

export const register = async (password, email, name) => {
  try {
    const response = await axios.post(`${API_URL}/signup`, { password, email, name });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
  }

};