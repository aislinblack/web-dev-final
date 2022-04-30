import React from 'react';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../hooks';

const NavigationSidebar = ({ active = 'home' }) => {
  const userInfo = useAppSelector((state) => state.userInfo);

  return (
    <>
      <div className='list-group'>
        <Link
          className={`list-group-item list-group-item-action d-flex align-items-center ${
            active === 'home' && 'active'
          }`}
          to='/home'
        >
          <i className='fa fa-solid fa-home'></i>
          <span className='d-none d-xl-block d-xxl-block ms-2'>Home</span>
        </Link>
        <Link
          className={`list-group-item list-group-item-action d-flex align-items-center ${
            active === 'search' && 'active'
          }`}
          to='/search'
        >
          <i className='fa fa-solid fa-search'></i>
          <span className='d-none d-xl-block d-xxl-block ms-2'>Search</span>
        </Link>
        {userInfo.loggedIn && (
          <Link
            className={`list-group-item list-group-item-action d-flex align-items-center ${
              active === 'feed' && 'active'
            }`}
            to='/feed'
          >
            <i className='fa fa-solid fa-book'></i>
            <span className='d-none d-xl-block d-xxl-block ms-2'>Feed</span>
          </Link>
        )}
        <Link
          className={`list-group-item list-group-item-action d-flex align-items-center ${
            active === 'profile' && 'active'
          }`}
          to='/profile'
        >
          <i className='fa fa-solid fa-user'></i>
          <span className='d-none d-xl-block d-xxl-block ms-2'>Profile</span>
        </Link>
        {userInfo.loggedIn && userInfo.user.role === 'author' && (
          <Link
            className={`list-group-item list-group-item-action d-flex align-items-center ${
              active === 'post-poem' && 'active'
            }`}
            to='/post-poem'
          >
            <i className='fa fa-solid fa-pen'></i>
            <span className='d-none d-xl-block d-xxl-block ms-2'>
              Post Poem
            </span>
          </Link>
        )}
        <Link
          className={`list-group-item list-group-item-action d-flex align-items-center ${
            active === 'privacy' && 'active'
          }`}
          to='/privacy'
        >
          <i className='fa fa-solid fa-lock'></i>
          <span className='d-none d-xl-block d-xxl-block ms-2'>
            Privacy Policy
          </span>
        </Link>
      </div>
    </>
  );
};

export default NavigationSidebar;
