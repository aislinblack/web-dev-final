import axios from 'axios';

const API_BASE = process.env.REACT_APP_API_BASE || 'http://localhost:4000';

export const signup = (args: {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: 'author' | 'reader' | 'critic';
}) => {
  return axios
    .post(`${API_BASE}/api/users`, args, { withCredentials: true })
    .then((response) => {
      return response.data;
    });
};

export const login = (args: { email: string; password: string }) => {
  return axios
    .post(`${API_BASE}/api/users/login`, args, { withCredentials: true })
    .then((response) => {
      return response.data;
    });
};

export const findUserById = (id: string) => {
  return axios.get(`${API_BASE}/api/users/${id}`).then((response) => {
    return response.data;
  });
};

export const findLoggedInUser = () => {
  return axios
    .get(`${API_BASE}/api/users/profile`, { withCredentials: true })
    .then((response) => {
      return response.data;
    });
};

export const updateUser = (args: any) => {
  return axios
    .put(`${API_BASE}/api/users`, args, { withCredentials: true })
    .then((response) => {
      return response.data;
    });
};

export const findUsersToFollow = (args: any) => {};
