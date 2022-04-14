import { useState } from 'react';
import { findPoems } from '../../services/poetry-service';

const Search = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<Record<string, string>[]>(
    []
  );

  const searchForPoems = (title: string, author: string) => {
    findPoems(title, author).then((data: any) => {
      console.log(data);
      setSearchResults(data.data);
    });
  };

  return (
    <div>
      <input
        value={searchTerm}
        onChange={(event) => setSearchTerm(event.target.value)}
      />
      <button onClick={() => searchForPoems(searchTerm, '')}>
        Search By Title!
      </button>
      <button onClick={() => searchForPoems('', searchTerm)}>
        Search By Author!
      </button>
      <div>
        {searchResults.map((search) => (
          <div key={`${search.title}${search.author}${search.lineCount}`}>
            {search.title}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Search;
