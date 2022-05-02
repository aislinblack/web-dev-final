import { User } from '../../types/user';
import { Link } from 'react-router-dom';
import { getMeerkatByFirstName } from '../../data/meerkats';
import './index.css';

const UserList = ({ users }: { users: User[] }) => {
  return (
    <div className='list-group'>
      {users.map((u) => (
        <div className='list-group-item'>
          <img
            className='small-profile-pic me-2'
            src={getMeerkatByFirstName(u.email)}
            alt=''
          />
          <span className='me-2'>
            {u.firstName} {u.lastName}
          </span>
          <Link to={`/profile/${u._id}`}>
            <i className='fa fa-solid fa-arrow-right'></i>
          </Link>
        </div>
      ))}
      {}
    </div>
  );
};

export default UserList;
