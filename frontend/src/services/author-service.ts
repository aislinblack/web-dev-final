import axios from 'axios';

const API_BASE = process.env.REACT_APP_API_BASE || 'http://localhost:4000';
const AUTHOR_API = `${API_BASE}/api/authors`;

export const postPoemForAuthor = (aid: string, text: string, title: string) => {
  return axios
    .post(`${AUTHOR_API}/${aid}/drafts`, { poem: { title, text } })
    .then((res) => {
      return res.data;
    });
};

export const getDrafts = (aid: string) => {
  return axios.get(`${AUTHOR_API}/${aid}/drafts`).then((res) => res.data);
};
