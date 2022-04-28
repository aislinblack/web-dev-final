import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { findUser } from './actions/user-actions';
import NavigationSidebar from './components/navigation';
import { useAppDispatch } from './hooks';

const PO3 = () => {
  const location = useLocation();
  const activeTab = location.pathname.replace('/', '') || 'home';

  const dispatch = useAppDispatch();

  useEffect(() => {
    findUser(dispatch);
  });

  return (
    <div className='row mt-2'>
      <div className='col-2 col-lg-1 col-xl-2'>
        <NavigationSidebar active={activeTab} />
      </div>
      <div className='col'>
        <Outlet />
      </div>
    </div>
  );
};
export default PO3;
