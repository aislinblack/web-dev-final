import reviewDao from '../review/review-dao';

const getReviews = async (req, res) => {
  const data = await reviewDao.findAllReviews();

  res.send(data);
};

const postReview = async (req, res) => {
  const review = req.body.review;
  // {text: String, collaborators: string[] -- emails, rating: number}
  const user = req.session['profile'];
  if (user.role != 'critic') {
    throw new Error('You must be a critic to post a review');
  }
  const newReview = {
    text: review.text,
    critics: [user._id, ...review.collaborators],
    rating: review.rating,
  };

  const data = await reviewDao.createReview(newReview);
  console.log(data);
  return data;
};

export default (app) => {
  app.get('/api/reviews', getReviews);
  app.post('/api/reviews', postReview);
};
