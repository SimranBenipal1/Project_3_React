import React from 'react';

export function Home() {
  return (
    <div style={{ textAlign: 'center', position: 'relative' }}>
      <div style={{ position: 'fixed', top: '20px', right: '20px' }}>
        <button>Sign in to Google</button>
      </div>
      <h1 style={{ marginRight: '20px', color: '#A20A35' }}>&nbsp;&nbsp;&nbsp;Welcome to Spyglass: The Financial Goal Planner</h1>
      <div style={{ marginTop: '50px', textAlign: 'left', paddingRight: '20%', paddingLeft: '20%' }}>
        <h2 style={{ color: 'black' }}>
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
      <div
        style={{
          position: 'fixed',
          bottom: '0',
          right: '0',
          backgroundImage: 'linear-gradient(to bottom right, transparent calc(50% - 1px), #A20A35 calc(50% - 1px))',
          width: '100%',
          height: '50%',
          zIndex: -1,
        }}
      ></div>

      <div style={{ position: 'fixed', bottom: '20px', right: '20px' }}>
        <button>View Your Dashboard </button>
      </div>
    </div>
  );
}
