import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserInfoContext from '../../global-context/UserInfoContext';
import { makeStyles } from '@material-ui/core/styles';
import { Drawer, AppBar, Toolbar, Typography, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import FlagCircleIcon from '@mui/icons-material/FlagCircle';

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
}));

export function Dashboard() {
  const classes = useStyles();
  const navigate = useNavigate();
  const { isSignedIn, userInfo } = useContext(UserInfoContext);
  const [goals, setGoals] = useState([]);
  const [selectedGoalId, setSelectedGoalId] = useState(null); // State to store the selected goal ID

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
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [isSignedIn, navigate, userInfo]);

  const handleGoalClick = (goalId) => {
    console.log("Clicked " + goalId)
    setSelectedGoalId(goalId); // Update the selectedGoalId state with the clicked goal ID
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
          {goals.map((goal) => (
            <ListItem
              button
              key={goal.id}
              onClick={() => handleGoalClick(goal.id)}
              selected={selectedGoalId === goal.id} // Apply selected style if the goal ID matches the selectedGoalId
            >
              <ListItemIcon>
                <FlagCircleIcon />
              </ListItemIcon>
              <ListItemText primary={goal.name} />
            </ListItem>
          ))}
        </List>
      </Drawer>
      <main className={classes.content}>
        <Toolbar />
        <div>
          <h1>Welcome to Your Personal Dashboard! Create a Goal or Select One From the Left.</h1>
          {/* Add the rest of your dashboard content here */}
        </div>
      </main>
    </div>
  );
}
