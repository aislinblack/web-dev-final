import { useEffect, useState } from 'react';
import { findUsersToFollow } from '../../services/user-service';
import { User } from '../../types/user';

const WhoToFollowList = ({ userId }: { userId: string }) => {
  const [loading, setLoading] = useState(true);
  const [followList, setFollowList] = useState<User[]>([]);

  useEffect(() => {
    findUsersToFollow(userId).then((res) => {
      setFollowList(res);
      setLoading(false);
    });
  }, [userId]);

  console.log(followList);

  if (loading) {
    return (
      <div>
        <i className='fas fa-spinner fa-pulse' />
      </div>
    );
  }

  return <div className='list-group'></div>;
};

export default WhoToFollowList;
