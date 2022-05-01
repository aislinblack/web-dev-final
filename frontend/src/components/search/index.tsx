import { useState } from 'react';
import { findPoems } from '../../services/poetry-service';
import { Link } from 'react-router-dom';

const Search = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<Record<string, string>[]>(
    []
  );

  const searchForPoems = (title: string, author: string) => {
    findPoems(title, author).then((data: any) => {
      setSearchResults(data.data);
    });
  };

  return (
    <div>
      <input
        value={searchTerm}
        onChange={(event) => setSearchTerm(event.target.value)}
      />
      <button
        className='btn btn-primary rounded-pill ms-2'
        onClick={() => searchForPoems(searchTerm, '')}
      >
        Search By Title!
      </button>
      <button
        className='btn btn-primary rounded-pill ms-2'
        onClick={() => searchForPoems('', searchTerm)}
      >
        Search By Author!
      </button>
      <div>
        {searchResults.map((search) => (
          <div
            className='row mb-1'
            key={`${search.title}${search.author}${search.lineCount}`}
          >
            <div className='col'>{search.author}</div>
            <div className='col'>{search.title}</div>
            <Link
              className='col'
              to={`/poem/${encodeURIComponent(
                search.author
              )}/${encodeURIComponent(search.title)}`}
            >
              Read Poem
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Search;
