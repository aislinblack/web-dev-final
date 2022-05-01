import { useState } from 'react';
import { useAppSelector } from '../../hooks';
import { postPoemForAuthor } from '../../services/author-service';

const PostPoem = () => {
  const [newTitle, setTitle] = useState('');
  const [newPoem, setPoem] = useState('');
  const userInfo = useAppSelector((state) => state.userInfo);

  const postPoem = () => {
    if (!userInfo.loggedIn) {
      throw new Error('something went wrong :(');
    }
    postPoemForAuthor(userInfo.user._id, newPoem, newTitle).then((res) => {
      setTitle('');
      setPoem('');
    });
  };

  return (
    <div>
      <h3>Post a Poem</h3>
      <form className='form-floating mb-2'>
        <input
          id='title'
          className='form-control'
          value={newTitle}
          onChange={(event) => setTitle(event.target.value)}
        />
        <label htmlFor='title'>Title</label>
      </form>
      <form className='form-floating mb-2'>
        <textarea
          id='poem'
          className='form-control'
          value={newPoem}
          onChange={(event) => setPoem(event.target.value)}
        />
        <label htmlFor='poem'>Poem</label>
      </form>
      <button className='btn btn-primary rounded-pill' onClick={postPoem}>
        Post Poem
      </button>
    </div>
  );
};

export default PostPoem;
