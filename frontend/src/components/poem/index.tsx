import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { findPoem } from '../../services/poetry-service';

type PoemType = {
  lines: string[];
  author: string;
  title: string;
  likes: number;
  rating: number;
};

const Poem = () => {
  const [poem, setPoem] = useState<null | PoemType>(null);
  const params = useParams();
  const author = params.author!;
  const title = params.title!;

  useEffect(() => {
    findPoem(title, author).then((res) => {
      setPoem(res);
    });
  }, [title, author]);

  return (
    <div>
      <h1>{title}</h1>
      <h4>{author}</h4>
      {poem?.lines?.map((line) => (
        <div>{line}</div>
      ))}
      {poem && (
        <div className='mt-5'>
          Likes: {poem.likes} Rating: {poem.rating}
        </div>
      )}
    </div>
  );
};

export default Poem;
