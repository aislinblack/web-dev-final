import { useEffect, useState } from 'react';
import { findPoems } from '../../services/poetry-service';
import { Link, ParamKeyValuePair, useSearchParams } from 'react-router-dom';

const Search = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<Record<string, string>[]>(
    []
  );

  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    console.log(searchParams);
    const title = searchParams.get('title') || '';
    const author = searchParams.get('author') || '';
    findPoems(title, author).then((data: any) => {
      setSearchResults(data.data);
    });
  }, [searchParams]);

  const searchForPoems = (title: string, author: string) => {
    const search: ParamKeyValuePair[] =
      title !== '' ? [['title', title]] : [['author', author]];
    setSearchParams(search);
  };

  return (
    <div>
      <h1>
        Find a Poem <i className='fas fa-book'></i>
      </h1>
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
