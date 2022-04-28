import { format } from 'date-fns';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getMeerkatByFirstName } from '../../data/meerkats';
import { useAppSelector } from '../../hooks';
import { findUserById } from '../../services/user-service';

import { User } from '../../types/user';

const FakeUser = {
  name: 'Fake User',
  email: 'fake@gmail.com',
  photo:
    'https://i.natgeofe.com/k/aa27e94d-8f1d-447e-9dba-15ac242317b0/meerkat-closeup-log_4x3.jpg',
  isAuthor: false,
  showLikedPoems: false,
  likedPoems: [],
  dateJoined: new Date(),
  followers: [],
  following: [],
};

const PublicProfile = ({ userId }: { userId: string }) => {
  const [user, setUser] = useState<null | User>(null);
  const loggedInUserInfo = useAppSelector((state) => state.userInfo);
  const navigate = useNavigate();

  if (loggedInUserInfo.loggedIn && userId === loggedInUserInfo.user._id) {
    navigate('/profile');
  }

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
          src={getMeerkatByFirstName(user.firstName)}
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
      </div>
    </div>
  );
};

export default PublicProfile;
