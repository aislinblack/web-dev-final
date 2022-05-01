import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  updateAuthor,
  updateCritic,
  updateReader,
} from '../../actions/user-actions';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getAuthors } from '../../services/author-service';
import { AuthorProfile } from '../../types/user';

const EditProfile = () => {
  const dispatch = useAppDispatch();
  const userInfo = useAppSelector((state) => state.userInfo);
  const navigate = useNavigate();
  const [authors, setAuthors] = useState<AuthorProfile[]>([]);

  useEffect(() => {
    getAuthors().then((res) => setAuthors(res));
  }, []);

  const [newFirstName, setFirstName] = useState(
    (userInfo.loggedIn && userInfo.user.firstName) || ''
  );
  const [newLastName, setLastName] = useState(
    (userInfo.loggedIn && userInfo.user.lastName) || ''
  );
  const [newPassword, setPassword] = useState<string | undefined>(undefined);
  const [newAffiliation, setAffiliation] = useState(
    (userInfo.loggedIn &&
      userInfo.user.role === 'critic' &&
      userInfo.user.criticProfile.organization) ||
      ''
  );
  const [newInspo, setNewInspo] = useState('');
  const [inspirations, setInspirations] = useState(
    (userInfo.loggedIn &&
      userInfo.user.role === 'author' &&
      userInfo.user.authorProfile.inspirations) ||
      []
  );
  const [newFavAuthor, setFavAuthor] = useState(
    (userInfo.loggedIn &&
      userInfo.user.role === 'reader' &&
      userInfo.user.readerProfile.favoriteAuthor) ||
      undefined
  );

  useEffect(() => {
    if (userInfo.loggedIn) {
      setFirstName(userInfo.user.firstName);
      setLastName(userInfo.user.lastName);
      setInspirations(
        (userInfo.user.role === 'author' &&
          userInfo.user.authorProfile.inspirations) ||
          []
      );
      setAffiliation(
        (userInfo.user.role === 'critic' &&
          userInfo.user.criticProfile.organization) ||
          ''
      );
    }
  }, [userInfo]);

  const saveProfile = () => {
    if (userInfo.loggedIn && userInfo.user.role === 'critic') {
      updateCritic(dispatch, userInfo.user, {
        firstName: newFirstName,
        lastName: newLastName,
        password: newPassword,
        organization: newAffiliation,
      }).then(() => navigate('/profile'));
    } else if (userInfo.loggedIn && userInfo.user.role === 'author') {
      updateAuthor(dispatch, userInfo.user, {
        firstName: newFirstName,
        lastName: newLastName,
        password: newPassword,
        inspirations,
      }).then(() => navigate('/profile'));
    } else if (userInfo.loggedIn && userInfo.user.role === 'reader') {
      updateReader(dispatch, userInfo.user, {
        firstName: newFirstName,
        lastName: newLastName,
        password: newPassword,
        favoriteAuthor: newFavAuthor,
      }).then(() => navigate('/profile'));
    }
  };

  return (
    <div>
      <form className='form-floating mb-2'>
        <input
          id='firstName'
          className='form-control'
          value={newFirstName}
          onChange={(event) => setFirstName(event.target.value)}
        />
        <label htmlFor='firstName'>First Name</label>
      </form>
      <form className='form-floating mb-2'>
        <input
          id='lastName'
          className='form-control'
          value={newLastName}
          onChange={(event) => setLastName(event.target.value)}
        />
        <label htmlFor='lastName'>Last Name</label>
      </form>
      {userInfo.loggedIn && userInfo.user.role === 'reader' && (
        <form className='form-floating mb-2'>
          <select
            id='favAuthor'
            className='form-control'
            value={newFavAuthor}
            placeholder='Emily Dickinson'
            onChange={(event) => setFavAuthor(event.target.value)}
          >
            <option disabled selected value={undefined}></option>
            {authors.map((author) => (
              <option key={author._id} value={author._id}>
                {author.firstName} {author.lastName}
              </option>
            ))}
          </select>
          <label htmlFor='favAuthor'>Favorite Author</label>
        </form>
      )}
      {userInfo.loggedIn && userInfo.user.role === 'critic' && (
        <form className='form-floating mb-2'>
          <input
            id='affiliation'
            className='form-control'
            value={newAffiliation}
            onChange={(event) => setAffiliation(event.target.value)}
          />
          <label htmlFor='affiliation'>Affiliation</label>
        </form>
      )}
      {userInfo.loggedIn && userInfo.user.role === 'author' && (
        <div>
          <label>Inspirations: </label>
          {inspirations.map((inspo, index) => (
            <div className='row' key={index}>
              <div className='col'>
                <form className='form-floating mb-2'>
                  <input
                    id={String(index)}
                    className='form-control'
                    value={inspo}
                    disabled
                  />
                </form>
              </div>
              <div className='col'>
                <button
                  className='btn btn-danger'
                  onClick={() => {
                    const inspos = inspirations.slice();
                    const filtered = inspos.filter((ins) => ins !== inspo);

                    setInspirations(filtered);
                  }}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
          <div className='row'>
            <div className='col'>
              <form className='form-floating mb-2'>
                <input
                  id='newInspo'
                  className='form-control'
                  value={newInspo}
                  onChange={(event) => setNewInspo(event.target.value)}
                ></input>
                <label htmlFor='newInspo'>New</label>
              </form>
            </div>
            <div className='col'>
              <button
                className='btn btn-info rounded-pill'
                onClick={() => {
                  setInspirations([...inspirations, newInspo]);
                  setNewInspo('');
                }}
              >
                Add Inspiration
              </button>
            </div>
          </div>
        </div>
      )}
      <form className='form-floating mt-3 mb-2'>
        <input
          id='password'
          type='password'
          className='form-control'
          value={newPassword}
          onChange={(event) => setPassword(event.target.value)}
        />
        <label htmlFor='password'>Password</label>
      </form>
      <button
        className='mt-2 btn btn-primary rounded-pill me-1'
        onClick={saveProfile}
      >
        Save Profile
      </button>
      <button
        className='mt-2 btn btn-danger rounded-pill ms-1'
        onClick={() => navigate('/profile')}
      >
        Cancel
      </button>
    </div>
  );
};

export default EditProfile;
