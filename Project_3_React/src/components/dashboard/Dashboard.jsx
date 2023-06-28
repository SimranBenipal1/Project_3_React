import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserInfoContext from '../../global-context/UserInfoContext';
import { makeStyles } from '@material-ui/core/styles';
import { Drawer, AppBar, Toolbar, Typography, List, ListItem, ListItemIcon, ListItemText, LinearProgress, Button } from '@material-ui/core';
import FlagCircleIcon from '@mui/icons-material/FlagCircle';
import GoalDetails from './GoalDetails';
import AddGoalDialog from './AddGoalDialog';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  title: {
    paddingLeft: theme.spacing(2),
  },
  progressBar: {
    width: '100%',
    position: 'absolute',
    bottom: 0,
    left: 0,
  },
  addButton: {
    marginTop: 'auto',
  },
}));

export function Dashboard() {
  const classes = useStyles();
  const navigate = useNavigate();
  const { isSignedIn, userInfo } = useContext(UserInfoContext);
  const [goals, setGoals] = useState([]);
  const [selectedGoal, setSelectedGoal] = useState(null); // State to store the selected goal
  const [addGoalDialogOpen, setAddGoalDialogOpen] = useState(false); // State to manage the open state of the Add Goal dialog
  const [updatedGoals, setUpdatedGoals] = useState([]); // State to store the updated goals list

  useEffect(() => {
    if (!isSignedIn) {
      navigate('/');
    } else {
      const sub = userInfo.sub;

      fetch(import.meta.env.VITE_API_URI + '/goals/sub/' + sub, {
        credentials: 'include'
      })
        .then((response) => response.json())
        .then((data) => {
          setGoals(data);
          setUpdatedGoals(data); // Update the updated goals list as well
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [isSignedIn, navigate, userInfo, updatedGoals]);

  const handleGoalClick = (goal) => {
    setSelectedGoal(goal); // Update the selectedGoal state with the clicked goal
  };

  const handleAddGoal = () => {
    setAddGoalDialogOpen(true); // Open the Add Goal dialog
  };

  const handleAddGoalDialogClose = () => {
    setAddGoalDialogOpen(false); // Close the Add Goal dialog
  };

  return (
    <div className={classes.root}>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" noWrap>
            SpyGlass Dashboard
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <Toolbar />
        <Typography variant="h6" className={classes.title}>
          Goals
        </Typography>
        <List>
          {updatedGoals.map((goal) => {
            //const progress = (goal.currentlySavedAmount / goal.targetAmount) * 100;
            const progress = goal.currentlySavedAmount <= 0 ? 0 : Math.min((goal.currentlySavedAmount / goal.targetAmount) * 100, 100);

            return (
              <div key={goal.id} style={{ position: 'relative' }}>
                <ListItem
                  button
                  onClick={() => handleGoalClick(goal)}
                  selected={selectedGoal && selectedGoal.id === goal.id} // Apply selected style if the goal matches the selectedGoal
                >
                  <ListItemIcon>
                    <FlagCircleIcon />
                  </ListItemIcon>
                  <ListItemText primary={goal.name} />
                </ListItem>
                <LinearProgress className={classes.progressBar} variant="determinate" value={progress} />
              </div>
            );
          })}
        </List>
        <Button className={classes.addButton} variant="contained" color="primary" onClick={handleAddGoal}>
          Add a goal
        </Button>
      </Drawer>
      <main className={classes.content}>
        <Toolbar />
        <div>
          {!selectedGoal && <h1>Welcome to Your Personal Dashboard! Create a Goal or Select One From the Left.</h1>}
          {selectedGoal && <GoalDetails goal={selectedGoal} />}
        </div>
      </main>
      {addGoalDialogOpen && (
        <AddGoalDialog
          open={addGoalDialogOpen}
          onClose={handleAddGoalDialogClose}
        />
      )}
    </div>
  );
}
