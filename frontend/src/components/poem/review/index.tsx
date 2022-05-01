import { useEffect, useState } from 'react';
import { PoemType } from '..';
import { useAppSelector } from '../../../hooks';
import { getCriticsByOrganization } from '../../../services/critics-service';
import { CriticProfile, User } from '../../../types/user';
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
    collaborators: string[]
  ) => Promise<void>;
}) => {
  const userInfo = useAppSelector((state) => state.userInfo);
  const [colleagues, setColleagues] = useState<CriticProfile[]>([]);

  useEffect(() => {
    if (userInfo.loggedIn && userInfo.user.role === 'critic') {
      getCriticsByOrganization(userInfo.user.criticProfile.organization).then(
        (res) => {
          setColleagues(res);
        }
      );
    }
  }, [userInfo]);

  return (
    <>
      <div>
        {userInfo.loggedIn && userInfo.user.role === 'critic' && (
          <ReviewForm
            poemId={poemId}
            onSubmit={submitReview}
            colleagues={colleagues}
          />
        )}
        <div>
          <h4>Reviews:</h4>
          {reviews?.map((review) => {
            return (
              <div className='mb-3' key={review._id}>
                <div>{'⭐'.repeat(review.rating)}</div>
                <div className='text-white'>{review.text}</div>
                <div>
                  {review.critics.map((critic) => critic.fullName).join(', ')}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Reviews;
