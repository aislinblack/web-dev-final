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

const findPoem = async (req, res) => {
  const poems = await poetrydb.findPoems({ title: req.params.title });
  console.log(poems);
  const maybePoem = poems.find((poem) => poem.author === req.params.author);

  if (!maybePoem) {
    throw new Error('No Such Poem');
  }

  res.send(maybePoem);
};

export default (app) => {
  app.get('/api/authors', getAuthors);
  app.get('/api/poems', searchForPoems);
  app.get('/api/poems/random/:number', findRandomPoems);
  app.get('/api/poems/author/:author/title/:title', findPoem);
};
