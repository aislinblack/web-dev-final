import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { commentOnPoem, findPoem } from '../../services/poetry-service';

type PoemType = {
  _id: string;
  lines: string[];
  author: string;
  title: string;
  likes: number;
  ratings: number[];
  comments: { postedBy: string; comment: string }[];
};

const Poem = () => {
  const [poem, setPoem] = useState<null | PoemType>(null);
  const [comment, setComment] = useState('');

  const params = useParams();
  const author = params.author!;
  const title = params.title!;

  const calculateAverageRating = (array: number[]) => {
    return array.length === 0
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
    await commentOnPoem(poem!._id, comment, 'someone');

    setPoem({
      ...poem,
      comments: [{ postedBy: 'someone', comment: comment }, ...poem.comments],
    });
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
      {poem.lines.map((line) => (
        <div>{line}</div>
      ))}

      <div className='mt-5'>
        Likes: {poem.likes} Rating: {calculateAverageRating(poem.ratings)}
      </div>
      <div>
        <textarea
          value={comment}
          onChange={(event) => setComment(event.target.value)}
        />
        <button onClick={sendComment}>Comment!</button>
      </div>
      {poem.comments.map((comment) => (
        <div>
          {comment.comment} - {comment.postedBy}
        </div>
      ))}
    </div>
  );
};

export default Poem;
