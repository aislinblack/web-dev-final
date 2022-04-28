import { Link, useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../hooks';
import RandomPoems from '../random-poems';
import Recommendations from '../recommendations';

const Home = () => {
  const navigate = useNavigate();
  const userInfo = useAppSelector((state) => state.userInfo);

  return (
    <div>
      <h1>Poetry of our Own</h1>
      <RandomPoems />
      {userInfo.loggedIn && <Recommendations userId={userInfo.user._id} />}
      <div>
        <h3>
          Find a poem?
          <button onClick={() => navigate('search')}>Search!</button>
        </h3>
      </div>
      {!userInfo.loggedIn && (
        <div>
          You don't seem to be signed in, would you like to:
          <ul className='list-group'>
            <Link to='/signup'>Sign up</Link>
            <Link to='/login'>Log in</Link>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Home;
