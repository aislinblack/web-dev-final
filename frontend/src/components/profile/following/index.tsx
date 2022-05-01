import { useEffect, useState } from 'react';
import { useAppSelector } from '../../../hooks';
import { getFollowing } from '../../../services/user-service';
import { User } from '../../../types/user';
import UserList from '../user-list';

const Following = () => {
  const userInfo = useAppSelector((state) => state.userInfo);

  const [following, setFollowing] = useState<User[]>([]);

  useEffect(() => {
    if (userInfo.loggedIn) {
      getFollowing(userInfo.user._id).then((following) =>
        setFollowing(following)
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

  return <UserList users={following} />;
};

export default Following;
