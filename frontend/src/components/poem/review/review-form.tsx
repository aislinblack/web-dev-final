import { useState } from 'react';
import { postReview } from '../../../services/review-service';

const ReviewForm = ({
  poemId,
  onSubmit,
}: {
  poemId: string;
  onSubmit: (reviewBody: string, rating: number) => Promise<void>;
}) => {
  const [rating, setRating] = useState(1);
  const [reviewBody, setReviewBody] = useState('');

  return (
    <div className='m-1'>
      <h4>Would you like to post an official review?</h4>
      <div className='row '>
        <div className='col'>
          <label>Rating</label>
          <select
            value={rating}
            onChange={(event) => setRating(Number(event.target.value))}
          >
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
            <option value={5}>5</option>
          </select>
        </div>
        <div className='col'></div>
      </div>
      <div className='m-1'>
        <label>Body</label>
        <br />
        <textarea
          value={reviewBody}
          onChange={(event) => setReviewBody(event.target.value)}
        />
      </div>
      <button
        onClick={() =>
          onSubmit(reviewBody, rating).then((res) => {
            setRating(1);
            setReviewBody('');
          })
        }
      >
        Submit
      </button>
    </div>
  );
};

export default ReviewForm;