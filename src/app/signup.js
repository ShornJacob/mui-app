import React, { useState } from "react";
import { signUp } from "./amplify";
import useForm from "react-hook-form";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import Layout from "./layout";
import {useStyles} from './styles'
import ConfirmSignUp from './confirmsignup'
import SnackBarMEssage from './snackbar'

export default () => {
  const classes = useStyles();
  const [stage, setStage] = useState(0);
  const [email, setEmail] = useState("");
  const [awsError, setawsError] = useState("");
  const { register, handleSubmit, errors, watch } = useForm();


  const  onSignUp = async (values) => {   
    const signUpStatus = await signUp(values.email, values.password)
   //if success, move to next stage
   //if not we have an error object. stage still 0
    if (signUpStatus === true) { 
      setStage(1)
      setEmail(watch("email")) 
    } else {
      setawsError(signUpStatus.message) 
    }
     
  }

 
  return (
    <React.Fragment>
    <Layout heading="Sign Up">
      {/* stage 0 signup */}
      { stage === 0 &&
        <form className={classes.form} onSubmit={handleSubmit(onSignUp)}>
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
            //https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
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
            inputRef={register({
              validate: value => value === watch("password")
            })}
            helperText={errors.password2 && "Passwords don't match."}
          />

          <Button
            type="submit"
            //this   sets    full     width    to     true  
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
      }

      {/* stage 1 is for authorization code */}
     { stage === 1 &&
        <ConfirmSignUp email={email}/>
      }
    </Layout>

    {/* not using watch to pass a prop. explicitely setting in prop */}
    {
     awsError !== "" && <SnackBarMEssage message={awsError} />
    }

    </React.Fragment>
  );
};
