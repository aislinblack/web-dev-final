import reviewDao from '../review/review-dao';
import usersDao from '../users/users-dao';

const getCriticReviews = async (req, res) => {
  const data = await reviewDao.findReviewsByCritic(req.params.cid);
  console.log(data);
  res.send(data);
};

const getCritics = async (req, res) => {
  const data = await usersDao.findUsersByRole('critic');

  res.send(
    data.map((critic) => {
      return {
        fullName: `${critic.firstName} ${critic.lastName}`,
        _id: critic._id,
      };
    })
  );
};

export default (app) => {
  app.get('/api/critics/:cid/reviews', getCriticReviews);
  app.get('/api/critics', getCritics);
};
