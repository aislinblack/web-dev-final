import axios from 'axios';

const poetryApiHost = 'https://poetrydb.org';

const findAuthors = () => {
  return axios.get(`${poetryApiHost}/authors`).then((data) => {
    return data.data.authors;
  });
};

const findPoems = (args: { title?: string; author?: string }) => {
  const url = `${poetryApiHost}${
    args.title ? `/title/${encodeURIComponent(args.title)}` : ''
  }${args.author ? `/author/${encodeURIComponent(args.author)}` : ''}`;

  return axios.get(url).then((response) => {
    return response.data;
  });
};

export default { findAuthors, findPoems };
