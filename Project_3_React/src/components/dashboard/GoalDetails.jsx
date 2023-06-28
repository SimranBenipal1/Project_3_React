import React from 'react';

function GoalDetails({ goal }) {
  return (
    <div>
      <h2>Selected Goal:</h2>
      <p>Goal ID: {goal.id}</p>
      <p>Goal Name: {goal.name}</p>
      <p>Goal Description: {goal.description}</p>
      <p>Target Date: {goal.targetDate}</p>
      <p>Target Amount: {goal.targetAmount}</p>
      <p>Currently Saved Amount: {goal.currentlySavedAmount}</p>
    </div>
  );
}

export default GoalDetails;
