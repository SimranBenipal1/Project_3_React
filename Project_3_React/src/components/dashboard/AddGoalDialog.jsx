import React, { useState, useContext } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@material-ui/core';
import UserInfoContext from '../../global-context/UserInfoContext';


const AddGoalDialog = ({ open, onClose }) => {

    const { userInfo } = useContext(UserInfoContext);

    const [goalData, setGoalData] = useState({
        goalName: '',
        goalDescription: '',
        targetAmount: '',
        currentlySavedAmount: '',
        targetDate: '',
        picture: '',
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setGoalData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handlePictureChange = (event) => {
        const file = event.target.files[0];
        setGoalData((prevState) => ({
            ...prevState,
            file: file, // Update the key to 'file'
        }));
    };

    const handleSubmit = () => {
        let pictureURL = '' 

        const formData = new FormData();
        formData.append('file', goalData.file);

        fetch(import.meta.env.VITE_API_URI  + "/upload", {
            method: "POST",
            body: formData,
            credentials: "include"
        })
        .then(response => response.text())
        .then(dataString => {
            console.log(dataString);
            pictureURL = dataString;

            const sub = userInfo.sub;

            const data = {
                sub: sub,
                name: goalData.goalName,
                description: goalData.goalDescription,
                picture: pictureURL,
                targetDate: goalData.targetDate,
                targetAmount: parseFloat(goalData.targetAmount), // Convert to number
                currentlySavedAmount: parseFloat(goalData.currentlySavedAmount), // Convert to number
            };

            fetch(import.meta.env.VITE_API_URI + '/goals', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            })
                .then((response) => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then((result) => {
                    console.log('Goal submitted successfully:', result);
                    onClose();
                })
                .catch((error) => {
                    console.error('Error submitting goal:', error);
                    // Handle error here
                });
        })
        .catch((error) => {
            console.error("Error:", error);
            setMessage("An error occurred during file upload");
        });
        
    }


return (
    <Dialog open={open} onClose={onClose}>
        <DialogTitle>Add a Goal</DialogTitle>
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
            <input type="file" accept="image/*" onChange={handlePictureChange} />
        </DialogContent>
        <DialogActions>
            <Button onClick={onClose} color="primary">
                Cancel
            </Button>
            <Button onClick={handleSubmit} color="primary">
                Submit
            </Button>
        </DialogActions>
    </Dialog>
);
};

export default AddGoalDialog;
