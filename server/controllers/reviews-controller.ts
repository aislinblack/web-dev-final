import reviewDao from '../review/review-dao';
import usersDao from '../users/users-dao';

const getReviews = async (req, res) => {
  let data = [];
  if (req.query.poem) {
    data = await reviewDao.findReviewsByPoem(req.query.poem);
  } else {
    data = await reviewDao.findAllReviews();
  }

  const dataWithCritics = await Promise.all(
    data.map(async (review) => {
      const critics = await Promise.all(
        review.critics.map(async (criticId) => {
          const critic = await usersDao.findUserById(criticId);

          return {
            _id: critic._id,
            fullName: `${critic.firstName} ${critic.lastName}`,
          };
        })
      );

      return { ...review._doc, critics };
    })
  );

  res.send(dataWithCritics);
};

const postReview = async (req, res) => {
  const review = req.body;
  // {text: String, collaborators: string[] -- emails, rating: number}
  // const user = req.session['profile'];
  // if (user.role != 'critic') {
  //   throw new Error('You must be a critic to post a review');
  // }
  const newReview = {
    text: review.text,
    critics: ['62685d6107b2e17c7fc78b05', ...review.collaborators],
    rating: review.rating,
    poemId: review.poemId,
  };

  const data = await reviewDao.createReview(newReview);

  res.send(data);
};

export default (app) => {
  app.get('/api/reviews', getReviews);
  app.post('/api/reviews', postReview);
};
