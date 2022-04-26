import { useState } from 'react';
import { PoemType } from '.';
import { useAppSelector } from '../../hooks';

const PoemBody = ({
  poem,
  sendComment,
}: {
  poem: PoemType;
  sendComment: (comment: string) => void;
}) => {
  const userInfo = useAppSelector((state) => state.userInfo);
  const [comment, setComment] = useState('');

  const calculateAverageRating = (array: number[]) => {
    return !array || array.length === 0
      ? 0
      : array.reduce(
          (previousValue, currentValue) => previousValue + currentValue,
          0
        ) / array.length;
  };

  return (
    <>
      <h1>{poem.title}</h1>
      <h4>{poem.author}</h4>
      {poem.lines.map((line, index) => (
        <div key={`${line}${index}`}>{line}</div>
      ))}

      <div className='mt-5'>
        Likes: {poem.likes.length} Rating:
        {calculateAverageRating(poem.ratings)}
      </div>
      {userInfo.loggedIn && (
        <div>
          <textarea
            value={comment}
            onChange={(event) => setComment(event.target.value)}
          />
          <button
            onClick={() => {
              sendComment(comment);
              setComment('');
            }}
          >
            Comment!
          </button>
        </div>
      )}
      {poem.comments.reverse().map((comment, index) => (
        <div key={index}>
          {comment.comment} - {comment.postedByName}
        </div>
      ))}
    </>
  );
};

export default PoemBody;
