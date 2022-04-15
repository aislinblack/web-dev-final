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

export const findPoem = (title: string, author: string) => {
  return axios
    .get(
      `${POETRY_API}/author/${encodeURIComponent(
        author
      )}/title/${encodeURIComponent(title)}`
    )
    .then((res) => {
      console.log(res.data);
      return res.data;
    });
};

export const findRandomPoems = () => {
  return axios.get(`${POETRY_API}/random/5`).then((res) => {
    return res.data;
  });
};

export const findDailyRandomPoems = () => {
  return axios.get(`${POETRY_API}/daily/random`).then((res) => {
    return res.data;
  });
};
