// https://material-ui.com/components/app-bar/

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { navigate} from "@reach/router";
import {getUser, logout} from '../app/utils'



const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            { getUser().email}
          </Typography>

          {/* https://reactjs.org/docs/events.html#mouse-events */}
          {/* https://stackoverflow.com/questions/40167287/react-material-ui-how-do-i-know-i-can-use-onclick-for-button */}
          {/* Material-UI documentation does not list the standard React (native browser) events */}

          {/* Redirect component does not work as a callback */}
          {/* seems callback has to be a function */}
          <Button color="inherit" onClick={() => logout(() => navigate(`/app/signin`))}>Logout</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}