import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Welcome = () => {
  const navigate = useNavigate();

  return (
    <div>
      <button onClick={() => navigate('/signup')}>Signup!</button>
      <button onClick={() => navigate('/login')}>Login!</button>
    </div>
  );
};

export default Welcome;
