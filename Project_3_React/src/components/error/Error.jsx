import React from 'react';

export function Error() {
  return (
    <div style={{ textAlign: 'center', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div>
        <h1 style={{ fontSize: '2.5em', color: '#A20A35' }}>Error</h1>
        <p style={{ marginTop: '1em', fontSize: '1.2em' }}>
          Page Not Found.
        </p>
      </div>
    </div>
  );
}
