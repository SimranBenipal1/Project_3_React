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
        picture: null,
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
            picture: file,
        }));
    };

    const handleSubmit = () => {
        // TODO: DONT FORGET THE S3 BUCKET UPLOAD ASKJDAFSLKJNADSNKJLADSKJNASDKJNLADSKJNLDASKJNLNKLJADFSKJLNFKJHBNFLJHBGFDLJHBGFDJHBFD DONT FORGET
        const sub = userInfo.sub;

        const data = {
            sub: sub,
            name: goalData.goalName,
            description: goalData.goalDescription,
            picture: "S3 URL STUFF", //goalData.picture ? URL.createObjectURL(goalData.picture) : null,
            targetDate: goalData.targetDate,
            targetAmount: parseFloat(goalData.targetAmount), // Convert to number
            currentlySavedAmount: parseFloat(goalData.currentlySavedAmount), // Convert to number
        };

        fetch(import.meta.env.VITE_API_URI + '/goals', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json', // Specify the content type as JSON
            },
            body: JSON.stringify(data),
        })
            .then((response) => response.json())
            .then((result) => {
                console.log('Goal submitted successfully:', result);
                onClose();
            })
            .catch((error) => {
                console.error('Error submitting goal:', error);
                // Handle error here
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
