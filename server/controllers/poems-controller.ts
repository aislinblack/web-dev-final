import poetrydb from '../services/poetrydb';
import { isYesterday } from 'date-fns';
import poemsDao, {
  createPoem,
  findPoemByAuthorAndTitle,
  findPoemById,
  findPoemByIdAndUpdate,
  updatePoem,
} from '../poems/poems-dao';
import usersDao from '../users/users-dao';

const getAuthors = async (req, res) => {
  const data = await poetrydb.findAuthors();

  res.send(data);
};

const searchForPoems = async (req, res) => {
  const title: string | undefined = req.query.title;
  const author: string | undefined = req.query.author;

  const data =
    !title && !author
      ? await poemsDao.findAllPoems()
      : await poetrydb.findPoems({ title, author });

  res.send(data);
};

let randomPoems = [];
let lastRefresh = new Date();

const findRandomPoemsDaily = async (req, res) => {
  if (randomPoems.length === 0 || isYesterday(lastRefresh)) {
    const data = await poetrydb.randomPoems(5);

    const sanitizedPoems = await Promise.all(
      data.map(async (randomPoem) => {
        let maybePoem = await findPoemByAuthorAndTitle(
          randomPoem.author,
          randomPoem.title
        ).exec();

        if (!maybePoem) {
          return createPoem({
            title: randomPoem.title,
            author: randomPoem.author,
          });
        }
        return maybePoem;
      })
    );

    lastRefresh = new Date();
    return res.send(sanitizedPoems);
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
      likes: [],
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
  const comment = req.body.comment;
  const userProfile = req.session.profile;

  if (!userProfile) {
    throw new Error('Must be logged in to post a comment');
  }

  const newComments = [
    ...poem.comments,
    {
      postedByName: `${userProfile.firstName} ${userProfile.lastName}`,
      postedById: userProfile.id,
      comment,
    },
  ];

  const updatedComment = await findPoemByIdAndUpdate(poemId, {
    ...poem._doc,
    comments: newComments,
  });

  res.send({ updatedComment });
};

const getMostPopularPoems = async (req, res) => {
  const poemCount = req.query.count ? Number(req.query.count) : 5;
  const poemQuery = poemsDao.findPoemsByLikeCount();

  const poems = await poemQuery.limit(poemCount);

  res.send(poems);
};

const likePoem = async (req, res) => {
  const pid = req.params.pid;
  const userId = req.query.userId;
  const lookupUser = await usersDao.findUserById(userId);

  const update = await poemsDao.likePoem(pid, lookupUser._id);

  res.send(update);
};

const getPoem = async (req, res) => {
  const pid = req.params.pid;
  const poem = await poemsDao.findPoemById(pid);

  res.send(poem);
};

export default (app) => {
  app.get('/api/authors', getAuthors);
  app.get('/api/poems', searchForPoems);
  app.get('/api/poems/daily/random', findRandomPoemsDaily);
  app.get('/api/poems/random/:number', findRandomPoems);
  app.get('/api/poems/author/:author/title/:title', findPoem);
  app.put('/api/poems/:pid/comment', createComment);
  app.get('/api/poems/popular', getMostPopularPoems);
  app.put('/api/poems/:pid/like', likePoem);
  app.get('/api/poems/:pid', getPoem);
};
