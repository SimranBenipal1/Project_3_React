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
    background: '#a20a35',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    background: '#f5f5f5',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  title: {
    paddingLeft: theme.spacing(2),
    color: '#a20a35',
    fontFamily: 'Inter, system-ui, Avenir, Helvetica, Arial, sans-serif',
    fontSize: '2.5rem',
  },
  listItem: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    fontSize: '1.8rem', // Increase the font size of Goal names in the drawer
  },
  progressBar: {
    width: '100%',
    position: 'absolute',
    bottom: 0,
    left: 0,
    '& .MuiLinearProgress-bar': {
      backgroundColor: '#a20a35',
    },
  },
  addButton: {
    marginTop: 'auto',
    background: '#a20a35',
    color: '#fff',
    '&:hover': {
      background: '#880524',
    },
  },
}));

export function Dashboard() {
  const classes = useStyles();
  const navigate = useNavigate();
  const { isSignedIn, userInfo } = useContext(UserInfoContext);
  const [goals, setGoals] = useState([]);
  const [selectedGoal, setSelectedGoal] = useState(null);
  const [addGoalDialogOpen, setAddGoalDialogOpen] = useState(false);
  const [updatedGoals, setUpdatedGoals] = useState([]);

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
          setUpdatedGoals(data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [isSignedIn, navigate, userInfo, updatedGoals]);

  const handleGoalClick = (goal) => {
    setSelectedGoal(goal);
  };

  const handleAddGoal = () => {
    setAddGoalDialogOpen(true);
  };

  const handleAddGoalDialogClose = () => {
    setAddGoalDialogOpen(false);
  };

  const updateGoals = () => {
    const sub = userInfo.sub;

    fetch(import.meta.env.VITE_API_URI + '/goals/sub/' + sub, {
      credentials: 'include'
    })
      .then((response) => response.json())
      .then((data) => {
        setGoals(data);
        setUpdatedGoals(data);
      })
      .catch((error) => {
        console.error(error);
      });
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
            const progress = goal.currentlySavedAmount <= 0 ? 0 : Math.min((goal.currentlySavedAmount / goal.targetAmount) * 100, 100);

            return (
              <div key={goal.id} style={{ position: 'relative' }}>
                <ListItem
                  button
                  onClick={() => handleGoalClick(goal)}
                  selected={selectedGoal && selectedGoal.id === goal.id}
                  className={classes.listItem} // Apply the custom listItem class
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
          {selectedGoal && <GoalDetails goal={selectedGoal} setGoal={setSelectedGoal}/>}
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
