import axios from 'axios';

const API_BASE = process.env.REACT_APP_API_BASE || 'http://localhost:4000';
const POETRY_API = `${API_BASE}/api/critics`;

const instance = axios.create({
  withCredentials: true,
  baseURL: POETRY_API,
});

export const getReviewsByCritic = (criticId: string) => {
  return instance.get(`${criticId}/reviews`).then((res) => res.data);
};

export const getCriticsByOrganization = (organization: string) => {
  return instance.get('', { params: { organization } }).then((res) => res.data);
};
