import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@material-ui/core';

function GoalDetails({ goal }) {
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);

  const handleDelete = () => {
    // Send a DELETE request to /goals/:id
    fetch(`${import.meta.env.VITE_API_URI}/goals/${goal.id}`, {
      method: 'DELETE',
      credentials: 'include'
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error deleting goal');
        }
        // Parse the response if it is not empty
        return response.text().then((data) => (data ? JSON.parse(data) : {}));
      })
      .then((data) => {
        console.log('Goal deleted successfully:', data);
        // Perform any additional actions or updates after deleting the goal
        handleCloseConfirmDialog(); // Close the confirmation dialog after successful deletion
      })
      .catch((error) => {
        console.error('Error deleting goal:', error);
        // Handle error here
      });
  };

  const handleConfirmDelete = () => {
    setConfirmDialogOpen(true);
  };

  const handleCloseConfirmDialog = () => {
    setConfirmDialogOpen(false);
  };

  return (
    <div>
      <h2>Selected Goal:</h2>
      <p>Goal ID: {goal.id}</p>
      <p>Goal Name: {goal.name}</p>
      <p>Goal Description: {goal.description}</p>
      <p>Target Date: {goal.targetDate}</p>
      <p>Target Amount: {goal.targetAmount}</p>
      <p>Currently Saved Amount: {goal.currentlySavedAmount}</p>
      <button onClick={handleConfirmDelete}>Delete</button>

      <Dialog open={confirmDialogOpen} onClose={handleCloseConfirmDialog}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          Are you sure you want to delete the goal "{goal.name}"?
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseConfirmDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="primary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default GoalDetails;
