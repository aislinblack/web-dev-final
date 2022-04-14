import axios from 'axios';

const API_BASE = process.env.REACT_APP_API_BASE || 'http://localhost:4000';
const POETRY_API = `${API_BASE}/api/poems`;

export const findPoems = (title: string, author: string) => {
  return axios.get(POETRY_API, {
    params: {
      title: title !== '' ? title : undefined,
      author: author !== '' ? author : undefined,
    },
  });
};
