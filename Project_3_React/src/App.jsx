import React, { useState } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home } from './components/home/Home';
import { Dashboard } from './components/dashboard/Dashboard';
import { Error } from './components/error/Error';
import UserInfoContext from './global-context/UserInfoContext';

function App() {
  const [userInfo, setUserInfo] = useState({});
  const [isSignedIn, setIsSignedIn] = useState(false);

  return (
    <UserInfoContext.Provider value={{ userInfo, setUserInfo, isSignedIn, setIsSignedIn }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/*" element={<Error />} />
        </Routes>
      </BrowserRouter>
    </UserInfoContext.Provider>
  );
}

export default App;
