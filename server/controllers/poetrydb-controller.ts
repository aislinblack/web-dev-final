import poetrydb from '../services/poetrydb';

const getAuthors = async (req, res) => {
  const data = await poetrydb.findAuthors();

  res.send(data);
};

const searchForPoems = async (req, res) => {
  const title: string | undefined = req.query.title;
  const author: string | undefined = req.query.author;
  const data = await poetrydb.findPoems({ title, author });
  res.send(data);
};

const findRandomPoems = async (req, res) => {
  const data = await poetrydb.randomPoems(req.params.number);
  res.send(data);
};

export default (app) => {
  app.get('/api/authors', getAuthors);
  app.get('/api/poems', searchForPoems);
  app.get('/api/poems/random/:number', findRandomPoems);
};
