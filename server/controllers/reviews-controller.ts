import reviewDao from '../review/review-dao';

const getReviews = async (req, res) => {
  if (req.query.poem) {
    const data = await reviewDao.findReviewsByPoem(req.query.poem);
    return res.send(data);
  }
  const data = await reviewDao.findAllReviews();

  res.send(data);
};

const postReview = async (req, res) => {
  const review = req.body;
  console.log(review);
  // {text: String, collaborators: string[] -- emails, rating: number}
  // const user = req.session['profile'];
  // if (user.role != 'critic') {
  //   throw new Error('You must be a critic to post a review');
  // }
  const newReview = {
    text: review.text,
    critics: ['62685d6107b2e17c7fc78b05', ...review.collaborators],
    rating: review.rating,
  };

  const data = await reviewDao.createReview(newReview);

  res.send(data);
};

export default (app) => {
  app.get('/api/reviews', getReviews);
  app.post('/api/reviews', postReview);
};
