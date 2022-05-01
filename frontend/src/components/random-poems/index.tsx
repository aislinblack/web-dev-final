import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { calculateAverageRating } from '../../helpers/averate-rating';
import { findDailyRandomPoems } from '../../services/poetry-service';
import { PoemType } from '../poem';

const RandomPoems = () => {
  const [loading, setLoading] = useState(true);
  const [poems, setPoems] = useState<PoemType[]>([]);

  useEffect(() => {
    findDailyRandomPoems().then((res) => {
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
            <div key={poem._id} className='row'>
              <div className='col'>{poem.author}</div>
              <div className='col'>{poem.title}</div>
              <div className='col'>
                <i className='fas fa-heart me-1'></i>
                {poem.likes.length}
              </div>
              <div className='col'>
                <i className='fas fa-star me-1'></i>
                {calculateAverageRating(poem.ratings)}
              </div>
              <div className='col'>
                <Link
                  to={`/poem/${encodeURIComponent(
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
