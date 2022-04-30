import { format } from 'date-fns';
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getMeerkatByFirstName } from '../../data/meerkats';
import { useAppSelector } from '../../hooks';
import Drafts from '../drafts';

const PrivateProfile = () => {
  const userInfo = useAppSelector((state) => state.userInfo);
  const navigate = useNavigate();

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
        <div className='text-muted'>{userInfo.user.role}</div>
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
            Interests:{' '}
            {userInfo.user.authorProfile.inspirations.length === 0
              ? 'None'
              : userInfo.user.authorProfile.inspirations.join(', ')}
          </div>
        )}
        <button
          className='btn btn-primary rounded-pill mt-2'
          onClick={() => navigate('/edit-profile')}
        >
          Edit
        </button>
        {userInfo.user.role === 'author' && (
          <Drafts authorId={userInfo.user._id} />
        )}
      </div>
    </div>
  );
};

export default PrivateProfile;
