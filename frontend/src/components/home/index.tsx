import { Link, useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../hooks';
import RandomPoems from '../random-poems';
import Recommendations from '../recommendations';
import WhoToFollowList from './who-to-follow-list';

const Home = () => {
  const navigate = useNavigate();
  const userInfo = useAppSelector((state) => state.userInfo);

  return (
    <div className='row'>
      <div className='col'>
        <h1>
          Poetry of our Own <i className='fas fa-toilet ms-1'></i>
        </h1>
        <RandomPoems />
        {userInfo.loggedIn && <Recommendations userId={userInfo.user._id} />}
        <div>
          <h3 className='mt-2'>
            Find a poem <i className='fas fa-search'></i>
            <button
              className='btn btn-primary rounded-pill btn-lg ms-2'
              onClick={() => navigate('search')}
            >
              Search!
            </button>
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
      {userInfo.loggedIn && (
        <div className='d-none d-lg-block col-lg-4 col-xl-4'>
          <WhoToFollowList userId={userInfo.user._id} />
        </div>
      )}
    </div>
  );
};

export default Home;
