import React from "react";
import Typography from "@material-ui/core/Typography";
import { Router, Link } from "@reach/router";
import PrivateRoute from './app/privateroute'
import Profile from './app/profile'
import Signup from "./app/signup";
import Signin from "./app/signin"; 

export default function App() {

  //Need a component. elements can only be rendered ditrecy to dom
  //https://reactjs.org/docs/rendering-elements.html
  const Links = () => (
    <Typography>
      <Link to="/app/signup">Signup</Link>
    </Typography>
  );

  return (

    <Router>
      <Links path="/" />
      <Signup path="/app/signup" />
      <Signin path="/app/signin" />
      <PrivateRoute path="/app/profile" component={Profile} />
    </Router>

  );
}
