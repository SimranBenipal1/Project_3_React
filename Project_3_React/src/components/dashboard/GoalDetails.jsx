import React, { useState, useEffect, useContext } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@material-ui/core';
import UserInfoContext from '../../global-context/UserInfoContext';
import BarGraph from './BarGraph';

function EditGoalDialog({ open, onClose, goal, onUpdate }) {
  const [goalData, setGoalData] = useState({
    goalName: '',
    goalDescription: '',
    targetAmount: '',
    currentlySavedAmount: '',
    targetDate: '',
    picture: null, // Added picture state to hold the uploaded file
  });

  useEffect(() => {
    if (goal) {
      setGoalData({
        goalName: goal.name,
        goalDescription: goal.description,
        targetAmount: goal.targetAmount,
        currentlySavedAmount: goal.currentlySavedAmount,
        targetDate: goal.targetDate,
        picture: null, // Initialize the picture state with null
      });
    }
  }, [goal]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setGoalData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handlePictureUpload = (event) => {
    const file = event.target.files[0];
    setGoalData((prevState) => ({
      ...prevState,
      picture: file,
    }));
  };

  const handleUpdate = () => {
    onUpdate(goalData);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit Goal</DialogTitle>
      <DialogContent>
        <TextField
          label="Goal Name"
          name="goalName"
          value={goalData.goalName}
          onChange={handleInputChange}
          fullWidth
        />
        <TextField
          label="Goal Description"
          name="goalDescription"
          value={goalData.goalDescription}
          onChange={handleInputChange}
          fullWidth
        />
        <TextField
          label="Target Amount"
          name="targetAmount"
          type="number"
          value={goalData.targetAmount}
          onChange={handleInputChange}
          fullWidth
        />
        <TextField
          label="Currently Saved Amount"
          name="currentlySavedAmount"
          type="number"
          value={goalData.currentlySavedAmount}
          onChange={handleInputChange}
          fullWidth
        />
        <TextField
          label="Target Date"
          name="targetDate"
          type="date"
          value={goalData.targetDate}
          onChange={handleInputChange}
          fullWidth
          InputLabelProps={{
            shrink: true,
          }}
        />
        <input type="file" onChange={handlePictureUpload} accept="image/*" /> {/* Add file input for picture upload */}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleUpdate} color="primary">
          Update
        </Button>
      </DialogActions>
    </Dialog>
  );
}


function GoalDetails({ goal, setGoal }) {
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const { userInfo } = useContext(UserInfoContext);
  
  const handleDelete = () => {
    // Send a DELETE request to /goals/:id
    fetch(`${import.meta.env.VITE_API_URI}/goals/${goal.id}`, {
      method: 'DELETE',
      credentials: 'include',
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error deleting goal');
        }
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

  const handleEdit = () => {
    setEditDialogOpen(true);
  };

  const handleUpdateGoal = async (updatedGoalData) => {
    const sub = userInfo.sub;
  
    try {
      // Upload the picture file
      const formData = new FormData();
      formData.append('file', updatedGoalData.picture);
  
      const uploadResponse = await fetch(`${import.meta.env.VITE_API_URI}/upload`, {
        method: 'POST',
        body: formData,
        credentials: 'include',
      });
  
      if (!uploadResponse.ok) {
        throw new Error('Error uploading picture');
      }
  
      const pictureURL = await uploadResponse.text();
  
      // Update the goal with the new data and picture URL
      const data = {
        sub: sub,
        name: updatedGoalData.goalName,
        description: updatedGoalData.goalDescription,
        picture: pictureURL,
        targetDate: updatedGoalData.targetDate,
        targetAmount: parseFloat(updatedGoalData.targetAmount),
        currentlySavedAmount: parseFloat(updatedGoalData.currentlySavedAmount),
      };
  
      const updateResponse = await fetch(`${import.meta.env.VITE_API_URI}/goals/${goal.id}`, {
        method: 'PUT',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
  
      if (!updateResponse.ok) {
        throw new Error('Error updating goal');
      }
  
      const updatedGoal = await updateResponse.json();
  
      console.log('Goal updated successfully:', updatedGoal);
      setGoal(updatedGoal);
      handleCloseEditDialog(); // Close the edit dialog after successful update
    } catch (error) {
      console.error('Error updating goal:', error);
      // Handle error here
    }
  };

  const handleCloseEditDialog = () => {
    setEditDialogOpen(false);
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
      <div>
      {/* ... */}
      <BarGraph targetAmount={goal.targetAmount} currentlySavedAmount={goal.currentlySavedAmount} />
      {/* ... */}
      </div>
      <img src={goal.picture}></img>
      <button onClick={handleConfirmDelete}>Delete</button>
      <button onClick={handleEdit}>Edit</button>

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

      <EditGoalDialog
        open={editDialogOpen}
        onClose={handleCloseEditDialog}
        goal={goal}
        onUpdate={handleUpdateGoal}
      />
    </div>
  );
}

export default GoalDetails;
