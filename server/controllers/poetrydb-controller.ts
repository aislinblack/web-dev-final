import poetrydb from '../services/poetrydb';

const getAuthors = async (req, res) => {
  const data = await poetrydb.findAuthors();

  res.send(data);
};

const searchForPoems = async (req, res) => {
  const title: string = req.query.title || '';
  const data = await poetrydb.findPoems({ title });
  res.send(data);
};

export default (app) => {
  app.get('/api/authors', getAuthors);
  app.get('/api/poems', searchForPoems);
};
