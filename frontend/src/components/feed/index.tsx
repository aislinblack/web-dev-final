import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../hooks';
import { Draft } from '../drafts';
import { ReviewType } from '../poem/review';

const Feed = () => {
  const [reviewsByPeopleYouFollow, setReviewsByPeopleYouFollow] = useState<
    ReviewType[]
  >([]);
  const [draftPoemsByPeopleYouFollow, setDraftPoemsByPeopleYouFollow] =
    useState<Draft[]>([]);
  const navigate = useNavigate();

  const userInfo = useAppSelector((state) => state.userInfo);

  useEffect(() => {}, []);

  useEffect(() => {
    if (!userInfo.loggedIn && !userInfo.refreshing) {
      navigate('/uh-oh');
    }
  }, [navigate, userInfo]);

  if (!userInfo.loggedIn) {
    return <></>;
  }

  return (
    <div>
      <h3>Your Poetry Feed</h3>
    </div>
  );
};

export default Feed;
