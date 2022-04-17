import axios from 'axios';

const API_BASE = process.env.REACT_APP_API_BASE || 'http://localhost:4000';

export const signup = (args: {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}) => {
  return axios.post(`${API_BASE}/api/users`, args).then((response) => {
    return response.data;
  });
};
