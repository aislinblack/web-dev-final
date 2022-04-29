import { User } from '../../types/user';
import { Link } from 'react-router-dom';

const UserList = ({ users }: { users: User[] }) => {
  return (
    <div className='list-group'>
      {users.map((u) => (
        <div className='list-group-item'>
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
