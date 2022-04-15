import { useNavigate } from 'react-router-dom';
import RandomPoems from '../random-poems';
import Recommendations from '../recommendations';

const Home = () => {
  const isLoggedIn = true;
  const navigate = useNavigate();

  return (
    <div>
      <h1>Name of site!</h1>
      <RandomPoems />
      {isLoggedIn && <Recommendations />}
      <div>
        <h3>
          Find a poem?{' '}
          <button onClick={() => navigate('search')}>Search!</button>
        </h3>
      </div>
      {!isLoggedIn && (
        <div>
          <button>Sign up</button>
          <button>Log in</button>
        </div>
      )}
    </div>
  );
};

export default Home;
