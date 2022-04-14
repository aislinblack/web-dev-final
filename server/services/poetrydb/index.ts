import axios from 'axios';

const poetryApiHost = 'https://poetrydb.org';

const searchPoetryDb = (args: { author?: string; title?: string }) => {};

const findAuthors = () => {
  return axios.get(`${poetryApiHost}/authors`).then((data) => {
    return data.data.authors;
  });
};

const findPoems = (args: { title?: string }) => {
  return axios
    .get(`${poetryApiHost}/title/${encodeURIComponent(args.title)}`)
    .then((response) => {
      console.log(response.data);
      return response.data;
    });
};

export default { findAuthors, findPoems };
