import poetrydb from '../services/poetrydb';

const getAuthors = async (req, res) => {
  const tuitdIdToDelete = req.params.tid;
  const data = await poetrydb.findAuthors();

  res.send(data);
};

export default (app) => {
  app.get('/api/authors', getAuthors);
};
