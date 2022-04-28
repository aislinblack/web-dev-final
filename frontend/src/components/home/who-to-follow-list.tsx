import { useState } from 'react';
import { User } from '../../types/user';

const WhoToFollowList = () => {
  const [loading, setLoading] = useState(true);
  const [followList, setFollowList] = useState<User[]>([]);

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
