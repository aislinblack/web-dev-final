import { Link, useNavigate, useRoutes } from 'react-router-dom';
import Recommendations from '../recommendations';

const poemsTheoretically = [
  {
    title: 'poem title',
    author: 'someone',
    genre: 'thats a thing',
    likes: 2,
    rating: -5,
    link: 'somewhere.com',
  },
  {
    title: 'poem title',
    author: 'someone',
    genre: 'thats a thing',
    likes: 2,
    rating: -5,
    link: 'somewhere.com',
  },
  {
    title: 'poem title',
    author: 'someone',
    genre: 'thats a thing',
    likes: 2,
    rating: -5,
    link: 'somewhere.com',
  },
  {
    title: 'poem title',
    author: 'someone',
    genre: 'thats a thing',
    likes: 2,
    rating: -5,
    link: 'somewhere.com',
  },
  {
    title: 'poem title',
    author: 'someone',
    genre: 'thats a thing',
    likes: 2,
    rating: 10,
    link: 'somewhere.com',
  },
];

const Home = () => {
  const isLoggedIn = true;
  const navigate = useNavigate();

  return (
    <div>
      <h1>Name of site!</h1>
      <div>
        <h3>5 Random Poems Today</h3>
        <ul>
          {poemsTheoretically.map((poem) => {
            return (
              <div className='row'>
                <div className='col'>{poem.author}</div>
                <div className='col'>{poem.title}</div>
                <div className='col'>{poem.genre}</div>
                <div className='col'>{poem.likes}</div>
                <div className='col'>{poem.rating}</div>
                <div className='col'>
                  <Link to={poem.link}>{poem.link}</Link>
                </div>
              </div>
            );
          })}
        </ul>
      </div>
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
