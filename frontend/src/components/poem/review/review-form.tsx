import { userInfo } from 'os';
import { useState } from 'react';
import { postReview } from '../../../services/review-service';
import { CriticProfile } from '../../../types/user';

const ReviewForm = ({
  poemId,
  onSubmit,
  colleagues,
  criticId,
}: {
  poemId: string;
  criticId: string;
  onSubmit: (
    reviewBody: string,
    rating: number,
    colleagues: string[]
  ) => Promise<void>;
  colleagues: CriticProfile[];
}) => {
  const [rating, setRating] = useState(1);
  const [reviewBody, setReviewBody] = useState('');
  const [collaborator, setCollaborator] = useState<undefined | string>(
    undefined
  );

  return (
    <div className='m-1'>
      <h4>Would you like to post an official review?</h4>
      <div className='row '>
        <div className='col'>
          <form className='form-floating mb-2'>
            <select
              id='rating'
              value={rating}
              className='form-control'
              onChange={(event) => setRating(Number(event.target.value))}
            >
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
              <option value={5}>5</option>
            </select>

            <label htmlFor='rating'>Rating</label>
          </form>
        </div>
        <div className='col'>
          <form className='form-floating mb-2'>
            <select
              id='collaborator'
              value={rating}
              className='form-control'
              onChange={(event) => setCollaborator(event.target.value)}
            >
              <option value={collaborator}>None</option>
              {colleagues
                .filter((colleague) => colleague._id !== criticId)
                .map((colleague) => (
                  <option value={colleague._id}>{colleague.fullName}</option>
                ))}
            </select>

            <label htmlFor='collaborator'>Collaborator</label>
          </form>
        </div>
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
        className='btn btn-primary rounded-pill'
        onClick={() =>
          onSubmit(reviewBody, rating, collaborator ? [collaborator] : []).then(
            (res) => {
              setRating(1);
              setReviewBody('');
            }
          )
        }
      >
        Submit
      </button>
    </div>
  );
};

export default ReviewForm;
