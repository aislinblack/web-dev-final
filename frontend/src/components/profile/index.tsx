import { useNavigate, useParams } from 'react-router-dom';
import './index.css';

import { useEffect } from 'react';

import { useAppSelector } from '../../hooks';
import PrivateProfile from './private-profile';
import PublicProfile from './public-profile';

const Profile = () => {
  const params = useParams();
  const userId = params.uid;
  const userInfo = useAppSelector((state) => state.userInfo);
  const navigate = useNavigate();

  return !userId ? <PrivateProfile /> : <PublicProfile userId={userId} />;
};

export default Profile;
