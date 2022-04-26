import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAppSelector } from '../../hooks';
import { commentOnPoem, findPoem } from '../../services/poetry-service';

type PoemType = {
  _id: string;
  lines: string[];
  author: string;
  title: string;
  likes: any[];
  ratings: number[];
  comments: { postedByName: string; comment: string }[];
};

const Poem = () => {
  const [poem, setPoem] = useState<null | PoemType>(null);
  const [comment, setComment] = useState('');

  const params = useParams();
  const author = params.author!;
  const title = params.title!;
  const userInfo = useAppSelector((state) => state.userInfo);

  const calculateAverageRating = (array: number[]) => {
    return !array || array.length === 0
      ? 0
      : array.reduce(
          (previousValue, currentValue) => previousValue + currentValue,
          0
        ) / array.length;
  };
  const sendComment = async () => {
    if (!poem) {
      return;
    }
    const res = await commentOnPoem(poem!._id, comment);

    setPoem({ ...res.updatedComment, lines: poem.lines });
  };

  useEffect(() => {
    findPoem(title, author).then((res) => {
      setPoem(res);
    });
  }, [title, author]);

  if (!poem) {
    return (
      <div>
        <h1>{title}</h1>
        <h4>{author}</h4>
        <div>
          <i className='fas fa-spinner fa-pulse fa-3x' />
        </div>
      </div>
    );
  }

  return (
    <div>
      <h1>{title}</h1>
      <h4>{author}</h4>
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
          <button onClick={sendComment}>Comment!</button>
        </div>
      )}
      {poem.comments.reverse().map((comment, index) => (
        <div key={index}>
          {comment.comment} - {comment.postedByName}
        </div>
      ))}
    </div>
  );
};

export default Poem;
