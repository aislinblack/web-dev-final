import { useState } from 'react';
import { PoemType } from '.';
import { useAppSelector } from '../../hooks';
import { likepoem } from '../../services/poetry-service';

const PoemBody = ({
  poem,
  sendComment,
}: {
  poem: PoemType;
  sendComment: (comment: string) => void;
}) => {
  const userInfo = useAppSelector((state) => state.userInfo);
  const [comment, setComment] = useState('');
  const [liked, setLiked] = useState(false);

  const calculateAverageRating = (array: number[]) => {
    return !array || array.length === 0
      ? 0
      : array.reduce(
          (previousValue, currentValue) => previousValue + currentValue,
          0
        ) / array.length;
  };

  const likePoem = () => {
    if (userInfo.loggedIn) {
      likepoem(poem._id).then((res) => {
        setLiked(true);
      });
    }
  };

  const didUserLikePoem =
    userInfo.loggedIn && (poem.likes.includes(userInfo.user._id) || liked);

  return (
    <>
      <h1>{poem.title}</h1>
      <h4>{poem.author}</h4>
      {poem.lines.map((line, index) => (
        <div key={`${line}${index}`}>{line}</div>
      ))}

      <div className='mt-5 row'>
        <div className='col'>
          <i
            className='fa fa-solid fa-heart me-1'
            style={{ color: didUserLikePoem ? 'red' : 'light-grey' }}
            onClick={() => likePoem()}
          ></i>{' '}
          {poem.likes.length + (liked ? 1 : 0)}
        </div>
        <div className='col'>
          <i className='fa fa-solid fa-star me-1' style={{ color: 'gold' }}></i>
          {calculateAverageRating(poem.ratings)}
        </div>
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
