import React from "react";
import Container from "@material-ui/core/Container";
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  }
}))

function App() {

  const classes = useStyles()

  return <Container component="main" maxWidth="xs">
    <CssBaseline />
    <div className={classes.paper}></div>
  </Container>;
}

export default App;


//https://github.com/mui-org/material-ui/blob/master/docs/src/pages/getting-started/templates/sign-in/SignIn.js

//https://material-ui.com/api/container/
//component	elementType	The component used for the root node. Either a string to use a DOM element or a component.
