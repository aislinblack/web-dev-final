import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { commentOnPoem, findPoem } from '../../services/poetry-service';
import Review from './review';
import PoemBody from './poem-body';

export type PoemType = {
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

  const params = useParams();
  const author = params.author!;
  const title = params.title!;

  const sendComment = async (comment: string) => {
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
    <div className='row'>
      <div className='col'>
        <PoemBody poem={poem} sendComment={sendComment} />
      </div>
      <div className='col'>
        <Review />
      </div>
    </div>
  );
};

export default Poem;
