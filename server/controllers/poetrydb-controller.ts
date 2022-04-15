import poetrydb from '../services/poetrydb';
import { isYesterday } from 'date-fns';
import {
  createPoem,
  findPoemByAuthorAndTitle,
  findPoemById,
  updatePoem,
} from '../poems/poems-dao';

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

let randomPoems = [];
let lastRefresh = new Date();

const findRandomPoemsDaily = async (req, res) => {
  if (randomPoems.length === 0 || isYesterday(lastRefresh)) {
    const data = await poetrydb.randomPoems(5);
    randomPoems = data;
    lastRefresh = new Date();
  }
  res.send(randomPoems);
};

const findRandomPoems = async (req, res) => {
  const data = await poetrydb.randomPoems(req.params.number);
  res.send(data);
};

const findPoem = async (req, res) => {
  const poems = await poetrydb.findPoems({ title: req.params.title });

  const maybePoem = poems.find((poem) => poem.author === req.params.author);

  if (!maybePoem) {
    throw new Error('No Such Poem');
  }

  let alsoMaybePoem = await findPoemByAuthorAndTitle(
    maybePoem.author,
    maybePoem.title
  ).exec();

  if (!alsoMaybePoem) {
    createPoem({
      title: maybePoem.title,
      author: maybePoem.author,
      likes: 0,
      comments: [],
      ratings: [],
    }).then((res) => {
      return res;
    });

    res.send({ ...maybePoem, comments: [], rating: [], likes: 0 });
    return;
  }

  res.send({ ...alsoMaybePoem._doc, lines: maybePoem.lines });
};

const createComment = async (req, res) => {
  const poemId = req.params.pid;
  const poem = await findPoemById(poemId);
  const newComments = [...poem.comments, req.body];

  const status = await updatePoem(poemId, {
    ...poem._doc,
    comments: newComments,
  });

  res.send({ status });
};

export default (app) => {
  app.get('/api/authors', getAuthors);
  app.get('/api/poems', searchForPoems);
  app.get('/api/poems/daily/random', findRandomPoemsDaily);
  app.get('/api/poems/random/:number', findRandomPoems);
  app.get('/api/poems/author/:author/title/:title', findPoem);
  app.put('/api/poems/:pid/comment', createComment);
};
