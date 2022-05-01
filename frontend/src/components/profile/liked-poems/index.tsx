import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { calculateAverageRating } from '../../../helpers/averate-rating';
import { getLikedPoems } from '../../../services/poetry-service';
import { PoemType } from '../../poem';

const LikedPoems = () => {
  const [likedPoems, setLikedPoems] = useState<PoemType[]>([]);

  useEffect(() => {
    getLikedPoems().then((res) => setLikedPoems(res));
  }, []);

  console.log(likedPoems);
  return (
    <div>
      <h4>Liked Poems</h4>
      {likedPoems.map((poem) => (
        <div className='border rounded m-2 p-2' key={poem._id}>
          <Link
            to={`/poem/${encodeURIComponent(poem.author)}/${encodeURIComponent(
              poem.title
            )}`}
          >
            {poem.title}
          </Link>
          <div>By {poem.author}</div>
          <div>
            <i className='fas fa-heart'></i> {poem.likes.length}
          </div>
        </div>
      ))}
    </div>
  );
};

export default LikedPoems;
