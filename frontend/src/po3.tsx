import { Outlet, useLocation } from 'react-router-dom';
import NavigationSidebar from './components/navigation';

const PO3 = () => {
  const location = useLocation();
  const activeTab = location.pathname.replace('/', '') || 'home';

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
