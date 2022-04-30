import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { updateAuthor, updateCritic } from '../../actions/user-actions';
import { useAppDispatch, useAppSelector } from '../../hooks';

const EditProfile = () => {
  const dispatch = useAppDispatch();
  const userInfo = useAppSelector((state) => state.userInfo);
  const navigate = useNavigate();

  const [newFirstName, setFirstName] = useState(
    (userInfo.loggedIn && userInfo.user.firstName) || ''
  );
  const [newLastName, setLastName] = useState(
    (userInfo.loggedIn && userInfo.user.lastName) || ''
  );
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
        organization: newAffiliation,
      }).then(() => navigate('/profile'));
    } else if (userInfo.loggedIn && userInfo.user.role === 'author') {
      updateAuthor(dispatch, userInfo.user, {
        firstName: newFirstName,
        lastName: newLastName,
        inspirations,
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
                className='btn btn-info'
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
      <button className='mt-2 btn btn-primary' onClick={saveProfile}>
        Save Profile
      </button>
    </div>
  );
};

export default EditProfile;
