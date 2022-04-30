import poemsDao from '../poems/poems-dao';
import reviewDao from '../review/review-dao';
import usersDao from '../users/users-dao';

const getCriticReviews = async (req, res) => {
  const data = await reviewDao.findReviewsByCritic(req.params.cid).exec();

  const critic = await usersDao.findUserById(req.params.cid);

  const dataWithStuff = await Promise.all(
    data.map(async (review) => {
      const reviewPoemId = review.poemId;
      const critics = await Promise.all(
        review._doc.critics.map((critic) => usersDao.findUserById(critic))
      );

      const poem = await poemsDao.findPoemById(reviewPoemId);

      return {
        ...review._doc,
        criticNames: critics.map(
          (critic) => `${critic.firstName} ${critic.lastName}`
        ),
        poem,
      };
    })
  );
  res.send(dataWithStuff);
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
