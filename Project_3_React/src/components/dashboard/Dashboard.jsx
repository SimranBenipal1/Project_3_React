import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import UserInfoContext from '../../global-context/UserInfoContext';

export function Dashboard() {
  const navigate = useNavigate();
  const { isSignedIn } = useContext(UserInfoContext);

  useEffect(() => {
    if (!isSignedIn) {
      navigate('/');
    }
  }, [isSignedIn, navigate]);

  return (
    <>
      <div className="content">
        <h1>Welcome to Your Personal Dashboard!</h1>
        {/* Add the rest of your dashboard content here */}
      </div>
    </>
  );
}
