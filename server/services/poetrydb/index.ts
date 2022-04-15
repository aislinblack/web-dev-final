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

  return axios
    .get(url)
    .then((response) => {
      if (response.data.status === 404) {
        return [];
      }
      return response.data;
    })
    .catch((error) => {
      return [];
    });
};

const randomPoems = (numberOfPoems: number) => {
  return axios
    .get(`${poetryApiHost}/random/${numberOfPoems}`)
    .then((response) => {
      return response.data.map((item) => {
        //TODO: use own database to have actual data
        return { ...item, likes: 0, rating: 0 };
      });
    });
};

export default { findAuthors, findPoems, randomPoems };
