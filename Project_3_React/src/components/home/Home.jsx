import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import UserInfoContext from '../../global-context/UserInfoContext';

import './Home.css';

export function Home() {
  const navigate = useNavigate();
  const { userInfo, setUserInfo, isSignedIn, setIsSignedIn } = useContext(UserInfoContext);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  useEffect(() => {
    fetch(import.meta.env.VITE_API_URI + '/userinfo', { credentials: 'include', method: 'GET' })
      .then(response => response.json())
      .then(userInfo => {
        setUserInfo(userInfo);
        setIsSignedIn(true);
        console.log(userInfo);
      })
      .catch(error => {
        console.error('Error fetching user info:', error);
        setIsSignedIn(false);
      });
  }, []);

  useEffect(() => {
    console.log(isSignedIn);
  }, [isSignedIn]);

  const handleSnackbarOpen = () => {
    setSnackbarOpen(true);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleDashboardClick = () => {
    if (!isSignedIn) {
      handleSnackbarOpen();
    } else {
      navigate('/dashboard');
    }
  };

  const handleSignInGoogle = async () => {
    if (isSignedIn) {
      try {
        await fetch(import.meta.env.VITE_API_URI + '/logout', { credentials: 'include', method: 'POST' });
        setIsSignedIn(false);
        setUserInfo({});
      } catch (error) {
        console.error('Error Signing out:', error);
      }
    } else {
      try {
        window.location.href = import.meta.env.VITE_API_URI + '/signin';
      } catch (error) {
        console.error('Error Signing in:', error);
      }
    }
  };

  return (
    <div className="home-container">
      <div style={{ position: 'fixed', top: '20px', right: '20px', display: 'flex', alignItems: 'center' }}>
        {isSignedIn && userInfo.picture && (
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <img
              src={userInfo.picture}
              alt={userInfo.given_name}
              style={{ width: '40px', borderRadius: '50%', marginRight: '10px' }}
            />
            <span style={{ marginRight: '10px' }}>{userInfo.given_name}</span>
          </div>
        )}
        <button onClick={handleSignInGoogle}>{isSignedIn ? 'Sign Out' : 'Sign in to Google'}</button>
      </div>
      <h1 className="home-title">&nbsp;&nbsp;&nbsp;&nbsp;Welcome to Spyglass: The Financial Goal Planner</h1>
      <div className="home-content">
        <h2>
          Spy Glass is a goal planner where you can:
          <ul>
            <li>Create goals</li>
            <li>Track goals</li>
            <li>Update your progress</li>
            <li>Visualize goals in the dashboard</li>
          </ul>
          Sign in to Google to get started.
        </h2>
      </div>
      <div className="diagonal-line"></div>
      <div style={{ position: 'fixed', bottom: '20px', right: '20px' }}>
        <button onClick={handleDashboardClick}>View Your Dashboard</button>
      </div>
      <Snackbar open={snackbarOpen} autoHideDuration={4000} onClose={handleSnackbarClose}>
        <Alert onClose={handleSnackbarClose} severity="error" sx={{ width: '100%' }}>
          Please sign in to access the dashboard. Sign in is located at the top right.
        </Alert>
      </Snackbar>
    </div>
  );
}
