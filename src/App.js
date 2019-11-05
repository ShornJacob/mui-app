import React, { useState } from "react";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import PersonOutlineRoundedIcon from "@material-ui/icons/PersonOutlineRounded";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import useForm from "react-hook-form";
import {Auth}  from "aws-amplify";
import { navigate} from "@reach/router"

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },

  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },

  submit: {
    //top,bottom,right
    margin: theme.spacing(3, 0, 2)
  }
}));

function App() {
  const classes = useStyles();

  //register method from react-hook-from
  const { register, handleSubmit, errors, watch } = useForm();

  const [stage, setStage] = useState(0);
  const [awsError, setAwsError] = useState("");

  //https://github.com/dabit3/gatsby-auth-starter-aws-amplify/blob/master/src/components/SignUp.js
  const signUp = async (username,password) => {
    try {
      await Auth.signUp({ username, password });
      setStage(1);
      console.log(stage);
    } catch (err) {
      setAwsError(err);
      console.log(awsError);
    }
  };

  const confirmSignUp = async (username,authCode) => {
    try {
      await Auth.confirmSignUp({ username, authCode });
      navigate("/app/login")
    } catch (err) {
      setAwsError(err);
      console.log(awsError);
    }
  };


  // const onSubmit = values => console.log(values)

  const onSubmit = values => signUp(values.email,values.password)

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar>
          <PersonOutlineRoundedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign Up
        </Typography>

     
         {stage === 0 && (
         <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            error={!!errors.email}
            // https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
            inputRef={register({
              pattern: {
                value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
              }
            })}
            helperText={errors.email && "Email not valid."}
          />

          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            error={!!errors.password}
            // {...pass}
            inputRef={register({
              minLength: {
                value: 8
              }
            })}
            helperText={errors.password && "Minimum Length of 8."}
          />

          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password2"
            label="Confirm Password"
            type="password"
            id="password2"
            error={!!errors.password2}
            // {...pass2}
            inputRef={register({
              validate: value => value === watch("password")
            })}
            helperText={errors.password2 && "Passwords don't match."}
          />

          <Button
            type="submit"
            //this sets full width to true
            fullWidth
            variant="outlined"
            className={classes.submit}
          >
            Sign Up
          </Button>

          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Sign In
              </Link>
            </Grid>
            <Grid item>
              <Link href="#" variant="body2">
                Forgot password
              </Link>
            </Grid>
          </Grid>
         </form>
  )}
           

           {stage === 1 && (
            <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
                   <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="authCode"
            label="Auth Code"
            name="authCode"
            autoFocus
            error={false}
            // https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
            inputRef={register({
              minLength: {
                value: 4
              }
            })}
            helperText={errors.email && "Email not valid."}
          />
             <Button
            type="submit"
            //this sets full width to true
            fullWidth
            variant="outlined"
            className={classes.submit}
          >
            Confirm Sign Up
          </Button>

              </form>
           )}

      </div>
    </Container>
  );
}

export default App;

//https://github.com/dabit3/gatsby-auth-starter-aws-amplify/blob/master/src/components/SignUp.js
