import { useEffect, useState } from 'react';
import { UPDATE_USER } from '../../actions/user-actions';
import { getMeerkatByFirstName } from '../../data/meerkats';
import { useAppDispatch } from '../../hooks';
import { findUsersToFollow, followUser } from '../../services/user-service';
import { User } from '../../types/user';
import './index.css';

type UserToFollow = User & {
  followed: boolean;
};

const WhoToFollowList = ({ userId }: { userId: string }) => {
  const [loading, setLoading] = useState(true);
  const [followList, setFollowList] = useState<UserToFollow[]>([]);
  const dispatch = useAppDispatch();

  useEffect(() => {
    findUsersToFollow(userId).then((res) => {
      setFollowList(
        res.map((ahh: User) => {
          return { ...ahh, followed: false };
        })
      );
      setLoading(false);
    });
  }, [dispatch, userId]);

  const clickFollow = (pid: string) => {
    followUser(pid).then((res) => {
      setFollowList(
        followList.map((follow) => {
          if (follow._id === pid) {
            return { ...follow, followed: true };
          }
          return follow;
        })
      );

      dispatch({ type: UPDATE_USER, user: res });
    });
  };

  if (loading) {
    return (
      <div>
        <i className='fas fa-spinner fa-pulse' />
      </div>
    );
  }

  return (
    <div className='list-group'>
      {followList.map((who) => {
        return (
          <>
            <li className='list-group-item wd-follow-container d-flex'>
              <img
                className='wd-profile-pic position-relative me-2'
                src={getMeerkatByFirstName(who.firstName)}
                alt=''
              />
              <div>
                {who.firstName} {who.lastName}
                <div className='text-muted'>{who.role}</div>
              </div>
              <div className='col'>
                <button
                  type='submit'
                  className='btn btn-primary fa-pull-right rounded-pill pt-1 pb-1'
                >
                  Follow
                </button>
              </div>
            </li>
          </>
        );
      })}
    </div>
  );
};

export default WhoToFollowList;
