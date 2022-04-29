import draftDao from '../drafts/draft-dao';

const postDraft = async (req, res) => {
  const poem = req.body.poem;
  const author = req.params.aid;

  const createPoem = await draftDao.createDraft({ ...poem, author });

  res.send(createPoem);
};

const getAllDrafts = async (req, res) => {
  const authorId = req.params.aid;
  const drafts = await draftDao.findDraftByAuthorId(authorId);

  res.send(drafts);
};

export default (app) => {
  app.post('/api/authors/:aid/drafts', postDraft);
  app.get('/api/authors/:aid/drafts', getAllDrafts);
};
