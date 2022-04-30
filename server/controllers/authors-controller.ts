import draftDao from '../drafts/draft-dao';
import usersDao from '../users/users-dao';

const postDraft = async (req, res) => {
  const poem = req.body.poem;
  const author = req.params.aid;

  const createPoem = await draftDao.createDraft({
    ...poem,
    author,
    datePosted: new Date(),
  });

  res.send(createPoem);
};

const getAllDrafts = async (req, res) => {
  const authorId = req.params.aid;
  const author = await usersDao.findUserById(authorId).exec();
  const drafts = await draftDao.findDraftByAuthorId(authorId).exec();

  const draftsWithAuthor = drafts.map((draft) => {
    return {
      ...draft._doc,
      authorName: `${author._doc.firstName} ${author._doc.lastName}`,
    };
  });

  res.send(draftsWithAuthor);
};

export default (app) => {
  app.post('/api/authors/:aid/drafts', postDraft);
  app.get('/api/authors/:aid/drafts', getAllDrafts);
};
