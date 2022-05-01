import draftDao from '../drafts/draft-dao';

const likeDraft = async (req, res) => {
  const draftId = req.params.draftId;
  const userId = req.query.userId || req.session.profile._id;

  const update = await draftDao.likeDraft(draftId, userId);

  res.send(update);
};

export default (app) => {
  app.put('/api/drafts/:draftId', likeDraft);
};
