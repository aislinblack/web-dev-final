import { useEffect, useState } from 'react';
import { getDrafts } from '../../services/author-service';

export type Draft = {
  title: string;
  text: string;
  likes: string[];
  author: string;
};

const Drafts = ({ authorId }: { authorId: string }) => {
  const [drafts, setDrafts] = useState<Draft[]>([]);

  useEffect(() => {
    getDrafts(authorId).then((res) => {
      setDrafts(res);
    });
  }, [authorId]);

  return (
    <div className='d-block '>
      <h4 className='mt-2'>Drafts</h4>
      {drafts.map((draft) => {
        return (
          <div className='mb-5 border rounded text-left'>
            <h5>{draft.title}</h5>
            <div>{draft.text}</div>
            <span>
              <i className='fa fa-solid fa-heart me-1'></i>
              {draft.likes.length}
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default Drafts;
