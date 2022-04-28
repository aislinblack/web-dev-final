import { format } from 'date-fns';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getMeerkatByFirstName } from '../../data/meerkats';
import { useAppSelector } from '../../hooks';

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

        <div>Followers: {userInfo.user.followers.length}</div>
        <div>Following: {userInfo.user.following.length}</div>
        <button onClick={() => navigate('/edit-profile')}>Edit</button>
      </div>
    </div>
  );
};

export default PrivateProfile;
