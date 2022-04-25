import axios from 'axios';

const API_BASE = process.env.REACT_APP_API_BASE || 'http://localhost:4000';
const POETRY_API = `${API_BASE}/api/poems`;

const instance = axios.create({
  withCredentials: true,
  baseURL: POETRY_API,
});

export const findPoems = (title: string, author: string) => {
  return instance.get('', {
    params: {
      title: title !== '' ? title : undefined,
      author: author !== '' ? author : undefined,
    },
  });
};

export const findPoem = (title: string, author: string) => {
  return instance
    .get(
      `author/${encodeURIComponent(author)}/title/${encodeURIComponent(title)}`
    )
    .then((res) => {
      return res.data;
    });
};

export const findRandomPoems = () => {
  return instance.get(`random/5`).then((res) => {
    return res.data;
  });
};

export const findDailyRandomPoems = () => {
  return instance.get(`daily/random`).then((res) => {
    return res.data;
  });
};

export const commentOnPoem = (pid: string, comment: string) => {
  return instance
    .put(
      `${pid}/comment`,
      {
        comment,
      },
      { withCredentials: true }
    )
    .then((res) => {
      return res.data;
    });
};
