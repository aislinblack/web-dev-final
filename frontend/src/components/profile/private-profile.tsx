import { format } from 'date-fns';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logoutUser } from '../../actions/user-actions';
import { getMeerkatByFirstName } from '../../data/meerkats';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getAuthorById } from '../../services/author-service';
import { logout } from '../../services/user-service';
import Drafts from '../drafts';
import LikedPoems from './liked-poems';
import ReviewsByCritic from './reviews';

const PrivateProfile = () => {
  const userInfo = useAppSelector((state) => state.userInfo);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [favoriteAuthor, setFavoriteAuthor] = useState('None');

  useEffect(() => {
    if (!userInfo.loggedIn && !userInfo.refreshing) {
      navigate('/home');
    }
  }, [userInfo, navigate]);

  useEffect(() => {
    if (
      userInfo.loggedIn &&
      userInfo.user.role === 'reader' &&
      userInfo.user.readerProfile.favoriteAuthor
    ) {
      getAuthorById(userInfo.user.readerProfile.favoriteAuthor).then((res) =>
        setFavoriteAuthor(`${res.firstName} ${res.lastName}`)
      );
    }
  }, [userInfo]);

  if (!userInfo.loggedIn) {
    return <></>;
  }

  return (
    <div className='d-flex justify-content-center'>
      <div className='text-center'>
        <img
          className='profile-pic'
          src={getMeerkatByFirstName(userInfo.user.email)}
          alt=''
        />
        <h3>
          {userInfo.user.firstName} {userInfo.user.lastName}
        </h3>
        <div className='text-muted'>
          {userInfo.user.role}{' '}
          {userInfo.user.role === 'reader' ? (
            <i className='fas fa-book-reader'></i>
          ) : userInfo.user.role === 'author' ? (
            <i className='fas fa-feather-alt'></i>
          ) : (
            <i className='fas fa-gavel'></i>
          )}
        </div>
        <div>Email: {userInfo.user.email}</div>
        {userInfo.user.role === 'critic' && (
          <div>Affiliation: {userInfo.user.criticProfile.organization}</div>
        )}
        {userInfo.user.dateJoined && (
          <div className='text-muted'>{`User since ${format(
            new Date(userInfo.user.dateJoined),
            'MMMM do yyy GGG'
          )}`}</div>
        )}
        <div>
          <Link to='followers'>
            Followers: {userInfo.user.followers.length}
          </Link>
        </div>
        <div>
          <Link to='following'>
            Following: {userInfo.user.following.length}
          </Link>
        </div>
        {userInfo.user.role === 'author' && (
          <div>
            Inspirations:{' '}
            {userInfo.user.authorProfile.inspirations.length === 0
              ? 'None'
              : userInfo.user.authorProfile.inspirations.join(', ')}
          </div>
        )}
        {userInfo.user.role === 'reader' && (
          <div>
            Favorite Author: {favoriteAuthor}{' '}
            <Link to={`/profile/${userInfo.user.readerProfile.favoriteAuthor}`}>
              <i className='fas fa-hand-point-right ms-1 fa-lg'></i>
            </Link>
          </div>
        )}
        <button
          className='btn btn-primary rounded-pill mt-2 me-1'
          onClick={() => navigate('/edit-profile')}
        >
          Edit
        </button>
        <button
          className='btn btn-danger rounded-pill mt-2 ms-1'
          onClick={() => {
            logoutUser(dispatch);
          }}
        >
          Logout
        </button>
        {userInfo.user.role === 'author' && (
          <Drafts authorId={userInfo.user._id} />
        )}
        {userInfo.user.role === 'critic' && (
          <ReviewsByCritic criticId={userInfo.user._id} />
        )}
        <LikedPoems />
      </div>
    </div>
  );
};

export default PrivateProfile;
