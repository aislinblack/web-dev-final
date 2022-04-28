import { Link, useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../hooks';
import RandomPoems from '../random-poems';
import Recommendations from '../recommendations';

const Home = () => {
  const navigate = useNavigate();
  const isLoggedIn = useAppSelector((state) => state.userInfo.loggedIn);

  return (
    <div>
      <h1>Poetry of our Own</h1>
      <RandomPoems />
      {isLoggedIn && <Recommendations />}
      <div>
        <h3>
          Find a poem?
          <button onClick={() => navigate('search')}>Search!</button>
        </h3>
      </div>
      {!isLoggedIn && (
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
