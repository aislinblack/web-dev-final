import { useEffect, useState } from 'react';
import { useAppSelector } from '../../hooks';

const EditProfile = () => {
  const userInfo = useAppSelector((state) => state.userInfo);

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

  const saveProfile = () => {};

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
      <button onClick={saveProfile}>Save Profile</button>
    </div>
  );
};

export default EditProfile;
