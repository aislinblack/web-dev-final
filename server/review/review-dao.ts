import reviewModel from './review-model';

export const findAllReviews = () => reviewModel.find();
export const findReviewByCritic = (criticId) =>
  reviewModel.findOne({ critics: { $elemMatch: criticId } });
export const findReviewById = (id: string) => reviewModel.findById(id);
export const createReview = (review) => reviewModel.create(review);
export const deleteReview = (rid) => reviewModel.deleteOne({ _id: rid });
export const updateReview = (rid, review) =>
  reviewModel.updateOne({ _id: rid }, { $set: review });

export default {
  findAllReviews,
  createReview,
  deleteReview,
  updateReview,
  findReviewByCritic,
};
