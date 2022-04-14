import axios from 'axios';

const poetryApiHost = 'https://poetrydb.org';

const searchPoetryDb = (args: { author?: string; title?: string }) => {};

const findAuthors = () => {
  return axios.get(`${poetryApiHost}/authors`).then((data) => {
    return data.data.authors;
  });
};

export default { findAuthors, searchPoetryDb };
