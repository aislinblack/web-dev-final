import { useEffect, useState } from 'react';
import { useAppSelector } from '../../../hooks';
import { getReviews, postReview } from '../../../services/review-service';
import ReviewForm from './review-form';

type Review = {
  text: string;
  critics: { fullName: string }[];
  rating: number;
};

const Reviews = ({ poemId }: { poemId: string }) => {
  const userInfo = useAppSelector((state) => state.userInfo);
  const [reviews, setReviews] = useState<null | Review[]>(null);

  useEffect(() => {
    getReviews({ poem: poemId }).then((res) => {
      setReviews(res);
    });
  }, [poemId]);

  const onSubmit = (reviewBody: string, rating: number) => {
    return postReview({
      text: reviewBody,
      rating: rating,
      collaborators: [],
      poemId,
    }).then((res) => {
      console.log(res);
      setReviews([res, ...(reviews || [])]);
    });
  };

  console.log(reviews);

  return (
    <>
      <div>
        {userInfo.loggedIn && userInfo.user.role === 'critic' && (
          <ReviewForm poemId={poemId} onSubmit={onSubmit} />
        )}
        <div>
          <h4>Reviews:</h4>
          {reviews?.map((review) => {
            return (
              <div>
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
