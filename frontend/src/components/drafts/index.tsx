import { useEffect, useState } from 'react';
import { useAppSelector } from '../../hooks';
import { getDrafts } from '../../services/author-service';
import { likeDraft } from '../../services/draft-service';

export type Draft = {
  title: string;
  text: string;
  likes: string[];
  author: string;
  _id: string;
  datePosted: string;
  authorName: string;
};

const Drafts = ({ authorId }: { authorId: string }) => {
  const [drafts, setDrafts] = useState<Draft[]>([]);
  const userInfo = useAppSelector((state) => state.userInfo);

  useEffect(() => {
    getDrafts(authorId).then((res) => {
      setDrafts(res);
    });
  }, [authorId]);

  const like = async (draftId: string) => {
    if (userInfo.loggedIn) {
      likeDraft(draftId).then((res) => {
        const newDrafts = drafts.map((draft) => {
          return draft._id === draftId
            ? { ...draft, likes: [...draft.likes, userInfo.user._id] }
            : draft;
        });

        setDrafts(newDrafts);
      });
    }
  };

  return (
    <div className='d-block '>
      <h4 className='mt-2'>Drafts</h4>
      {drafts.map((draft) => {
        const canUserLikeDraft =
          userInfo.loggedIn && !draft.likes.includes(userInfo.user._id);

        const didUserLikeDraft =
          userInfo.loggedIn && draft.likes.includes(userInfo.user._id);
        return (
          <div key={draft._id} className='mb-5 border rounded text-left p-2'>
            <h5>{draft.title}</h5>
            <div>{draft.text}</div>
            <span onClick={() => canUserLikeDraft && like(draft._id)}>
              <i
                className='fa fa-solid fa-heart me-1'
                style={{ color: didUserLikeDraft ? 'red' : 'white' }}
              ></i>
              {draft.likes.length}
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default Drafts;
