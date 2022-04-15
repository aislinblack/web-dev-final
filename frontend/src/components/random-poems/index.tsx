import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { findRandomPoems } from '../../services/poetry-service';

const RandomPoems = () => {
  const [loading, setLoading] = useState(true);
  const [poems, setPoems] = useState<Record<string, string>[]>([]);

  useEffect(() => {
    findRandomPoems().then((res) => {
      setPoems(res);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <div>
        <i className='fas fa-spinner fa-pulse' />
      </div>
    );
  }

  return (
    <div>
      <h3>5 Random Poems Today</h3>
      <ul>
        {poems.map((poem) => {
          return (
            <div className='row'>
              <div className='col'>{poem.author}</div>
              <div className='col'>{poem.title}</div>
              <div className='col'>{poem.likes}</div>
              <div className='col'>{poem.rating}</div>
              <div className='col'>
                <Link
                  to={`poem/${encodeURIComponent(
                    poem.author
                  )}/${encodeURIComponent(poem.title)}`}
                >
                  Read Poem
                </Link>
              </div>
            </div>
          );
        })}
      </ul>
    </div>
  );
};

export default RandomPoems;
