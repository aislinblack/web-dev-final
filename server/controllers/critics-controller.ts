import reviewDao from '../review/review-dao';

const getCriticReviews = async (req, res) => {
  const data = await reviewDao.findReviewByCritic(req.params.cid);

  console.log(data);

  res.send(data);
};

export default (app) => {
  app.get('/api/critic/:cid/reviews', getCriticReviews);
};
