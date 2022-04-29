import { useEffect, useState } from 'react';
import { getMeerkatByFirstName } from '../../data/meerkats';
import { findUsersToFollow } from '../../services/user-service';
import { User } from '../../types/user';
import './index.css';

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

  return (
    <div className='list-group'>
      {followList.map((follow) => {
        return (
          <>
            <li className='list-group-item'>
              <div className='row me-1'>
                <div className='col-2'>
                  <img
                    className='wd-avatar'
                    src={getMeerkatByFirstName(follow.email)}
                    alt=''
                  />
                </div>
                <div className='col-7'>
                  <p className='fw-bold mb-0'>
                    {follow.firstName} {follow.lastName}
                    <i className='fa fa-certificate'></i>
                  </p>
                  <p className='text-muted mt-0 mb-0'>{follow.role}</p>
                </div>
                <div className='col-3'>
                  <button className='btn btn-primary fw-bold wd-follow-button mt-1'>
                    Follow
                  </button>
                </div>
              </div>
            </li>
          </>
        );
      })}
    </div>
  );
};

export default WhoToFollowList;
