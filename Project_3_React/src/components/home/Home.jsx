import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

export function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      {/* Sign into Google Button */}
      <div style={{ position: 'fixed', top: '20px', right: '20px' }}>
        <button>Sign in to Google</button>
      </div>
      {/* Title and Paragraphs */}
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
      {/* This Div is for the diagonal Line */}
      <div className="diagonal-line"></div>
      {/* Dashboard Button */}
      <div style={{ position: 'fixed', bottom: '20px', right: '20px' }}>
        <button onClick={() => navigate('/dashboard')}>View Your Dashboard</button>
      </div>
    </div>
  );
}
