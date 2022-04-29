import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../hooks';
import { findRecommendations } from '../../services/poetry-service';
import { PoemType } from '../poem';

const Recommendations = ({ userId }: { userId: string }) => {
  const [recs, setRecs] = useState<PoemType[]>([]);

  useEffect(() => {
    findRecommendations(userId).then((newRecs) => {
      setRecs(newRecs);
    });
  }, [userId]);

  return (
    <div>
      <h3>You might like:</h3>
      <ul className='list-group'>
        {recs.map((rec) => {
          return (
            <Link
              to={`/poem/${encodeURIComponent(rec.author)}/${encodeURIComponent(
                rec.title
              )}`}
              className='list-group-item'
              key={rec._id}
            >
              {rec.title} - {rec.author}
            </Link>
          );
        })}
      </ul>
    </div>
  );
};

export default Recommendations;
