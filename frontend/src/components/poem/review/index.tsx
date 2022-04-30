import { PoemType } from '..';
import { useAppSelector } from '../../../hooks';
import ReviewForm from './review-form';

export type ReviewType = {
  text: string;
  critics: { fullName: string }[];
  rating: number;
  _id: string;
  datePosted: string;
  criticNames: string[];
  poem?: PoemType;
};

const Reviews = ({
  reviews,
  submitReview,
  poemId,
}: {
  reviews: ReviewType[];
  poemId: string;
  submitReview: (
    reviewBody: string,
    rating: number,
    collaborators?: string[]
  ) => Promise<void>;
}) => {
  const userInfo = useAppSelector((state) => state.userInfo);

  return (
    <>
      <div>
        {userInfo.loggedIn && userInfo.user.role === 'critic' && (
          <ReviewForm poemId={poemId} onSubmit={submitReview} />
        )}
        <div>
          <h4>Reviews:</h4>
          {reviews?.map((review) => {
            return (
              <div key={review._id}>
                {'⭐'.repeat(review.rating)} : {review.text} -
                {review.critics.map((critic) => critic.fullName)}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Reviews;
