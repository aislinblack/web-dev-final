import draftDao from '../drafts/draft-dao';
import usersDao from '../users/users-dao';

const likeDraft = async (req, res) => {
  const pid = req.params.pid;
  const userId = req.query.userId || req.session.profile._id;

  const update = await draftDao.likeDraft(pid, userId);

  res.send(update);
};

export default (app) => {
  app.put('/api/drafts/:draftId', likeDraft);
};
