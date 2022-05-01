import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getReviewsByCritic } from '../../../services/critics-service';
import { ReviewType } from '../../poem/review';

const ReviewsByCritic = ({ criticId }: { criticId: string }) => {
  const [reviews, setReviews] = useState<ReviewType[]>([]);

  useEffect(() => {
    getReviewsByCritic(criticId).then((res) => setReviews(res));
  }, [criticId]);

  return (
    <div>
      <h4>Reviews</h4>
      {reviews.map((review) => (
        <div className='border rounded m-2 p-2' key={review._id}>
          <Link
            to={`/poem/${encodeURIComponent(
              review.poem!.author
            )}/${encodeURIComponent(review.poem!.title)}`}
          >
            {review.poem?.title}
          </Link>
          <div>{review.criticNames.join(', ')}</div>
          <div>{'⭐'.repeat(review.rating)}</div>
        </div>
      ))}
    </div>
  );
};

export default ReviewsByCritic;
