import axios from 'axios';

const API_BASE = process.env.REACT_APP_API_BASE || 'http://localhost:4000';
const POETRY_API = `${API_BASE}/api/reviews`;

const instance = axios.create({
  withCredentials: true,
  baseURL: POETRY_API,
});

export const postReview = (args: {
  text: string;
  collaborators: string[];
  rating: number;
}) => {
  return instance.post('', args).then((result) => {
    console.log(result.data);
  });
};
