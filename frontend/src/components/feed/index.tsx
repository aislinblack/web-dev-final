import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../hooks';
import { getDrafts } from '../../services/author-service';
import { getReviewsByCritic } from '../../services/critics-service';
import { getFollowing } from '../../services/user-service';
import { User } from '../../types/user';
import { Draft } from '../drafts';
import { ReviewType } from '../poem/review';
import Post from './post';

export type PostType =
  | (ReviewType & { type: 'review' })
  | (Draft & { type: 'draft' });

const Feed = () => {
  const [reviewsByPeopleYouFollow, setReviewsByPeopleYouFollow] = useState<
    ReviewType[]
  >([]);
  const [draftPoemsByPeopleYouFollow, setDraftPoemsByPeopleYouFollow] =
    useState<Draft[]>([]);
  const [peopleYouFolow, setPeopleYouFollow] = useState<User[]>([]);

  const navigate = useNavigate();

  const userInfo = useAppSelector((state) => state.userInfo);

  useEffect(() => {
    if (userInfo.loggedIn) {
      getFollowing(userInfo.user._id).then((res) => {
        setPeopleYouFollow(res);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userInfo.loggedIn]);

  useEffect(() => {
    Promise.all(
      peopleYouFolow.map((user) => {
        if (user.role === 'author') {
          return getDrafts(user._id).then((drafts) => {
            return drafts;
          });
        }
        return null;
      })
    ).then((data) => {
      const reduceMaybe = data.reduce(
        (previousValue, currentValue) =>
          currentValue ? [...currentValue, ...previousValue] : previousValue,
        []
      );

      setDraftPoemsByPeopleYouFollow(reduceMaybe as Draft[]);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [peopleYouFolow]);

  useEffect(() => {
    Promise.all(
      peopleYouFolow.map((user) => {
        if (user.role === 'critic') {
          return getReviewsByCritic(user._id).then((reviews) => {
            return reviews;
          });
        }
        return null;
      })
    ).then((data) => {
      const reduceMaybe = data.reduce(
        (previousValue, currentValue) =>
          currentValue ? [...currentValue, ...previousValue] : previousValue,
        []
      );

      setReviewsByPeopleYouFollow(reduceMaybe as ReviewType[]);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [peopleYouFolow]);

  const allPosts: PostType[] = [
    ...reviewsByPeopleYouFollow.map((review) => {
      return { ...review, type: 'review' } as PostType;
    }),
    ...draftPoemsByPeopleYouFollow.map((draft) => {
      return { ...draft, type: 'draft' } as PostType;
    }),
  ];

  const sortedByDate = allPosts.sort((a, b) => {
    const dateA = new Date(a.datePosted);
    const dateB = new Date(b.datePosted);

    return dateB.getTime() - dateA.getTime();
  });

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
      {sortedByDate.map((post) => (
        <Post key={post._id} post={post} />
      ))}
    </div>
  );
};

export default Feed;
