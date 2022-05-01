import { format } from 'date-fns';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getMeerkatByFirstName } from '../../data/meerkats';
import { useAppSelector } from '../../hooks';
import { getAuthorById } from '../../services/author-service';
import { findUserById } from '../../services/user-service';

import { User } from '../../types/user';
import Drafts from '../drafts';
import ReviewsByCritic from './reviews';

const PublicProfile = ({ userId }: { userId: string }) => {
  const [user, setUser] = useState<null | User>(null);
  const loggedInUserInfo = useAppSelector((state) => state.userInfo);
  const [favoriteAuthor, setFavoriteAuthor] = useState('None');
  const navigate = useNavigate();

  if (loggedInUserInfo.loggedIn && userId === loggedInUserInfo.user._id) {
    navigate('/profile');
  }

  useEffect(() => {
    if (user?.role === 'reader' && user.readerProfile.favoriteAuthor) {
      getAuthorById(user.readerProfile.favoriteAuthor).then((res) => {
        setFavoriteAuthor(`${res.firstName} ${res.lastName}`);
      });
    }
  });

  useEffect(() => {
    findUserById(userId).then((res) => {
      setUser(res);
    });
  }, [userId]);

  if (!user) {
    return <div>:|</div>;
  }

  return (
    <div className='d-flex justify-content-center'>
      <div className='text-center'>
        <img
          className='profile-pic'
          src={getMeerkatByFirstName(user.email)}
          alt=''
        />
        <h3>
          {user.firstName} {user.lastName}
        </h3>
        <div className='text-muted'>{user.role}</div>
        {user.dateJoined && (
          <div className='text-muted'>{`User since ${format(
            new Date(user.dateJoined),
            'MMMM do yyy GGG'
          )}`}</div>
        )}

        <div>Followers: {user.followers.length}</div>
        <div>Following: {user.following.length}</div>
        {user.role === 'author' && (
          <div>
            Inspirations:
            {user.authorProfile.inspirations.length === 0
              ? 'None'
              : user.authorProfile.inspirations.join(', ')}
          </div>
        )}
        {user.role === 'author' && <Drafts authorId={user._id} />}
        {user.role === 'critic' && <ReviewsByCritic criticId={user._id} />}
        {user.role === 'reader' && (
          <div>
            Favorite Author: {favoriteAuthor}{' '}
            <Link to={`/profile/${user.readerProfile.favoriteAuthor}`}>
              <i className='fas fa-hand-point-right ms-1 fa-lg'></i>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default PublicProfile;
