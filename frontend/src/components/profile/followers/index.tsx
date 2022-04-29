import { pid } from 'process';
import { useEffect, useState } from 'react';
import { useAppSelector } from '../../../hooks';
import { getFollowers } from '../../../services/user-service';
import { User } from '../../../types/user';
import UserList from '../user-list';

const Followers = () => {
  const userInfo = useAppSelector((state) => state.userInfo);
  const [followers, setFollowers] = useState<User[]>([]);

  useEffect(() => {
    if (userInfo.loggedIn) {
      getFollowers(userInfo.user._id).then((followers) =>
        setFollowers(followers)
      );
    }
  }, [userInfo]);

  if (!userInfo.loggedIn) {
    if (!userInfo.refreshing) {
      throw new Error('Something has gone seriously wrong');
    }
    return (
      <div>
        <i className='fas fa-spinner fa-pulse' />
      </div>
    );
  }

  return <UserList users={followers} />;
};

export default Followers;
