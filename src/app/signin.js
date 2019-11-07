import React, { useState } from "react";
import useForm from "react-hook-form";
import { signIn } from "./amplify";
import {setUser} from './utils'
import { Redirect } from "@reach/router";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import TextField from "@material-ui/core/TextField";
import Layout from "./layout";
import {useStyles} from './styles'
import { isLoggedIn } from "./utils"


import SnackBarMEssage from './snackbar'

export default () => {
  
  const classes = useStyles()
  const [awsError, setawsError] = useState(null)
  const { register, handleSubmit, errors } = useForm()

  const  onSignIn = async (values) => {   
    const userInfo = await signIn(values.email, values.password)
    //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/in
    if ('username' in userInfo) { 
      setUser(userInfo)
      return <Redirect  to='/app/profile' noThrow/>
    } else {
      setawsError(userInfo.message) 
      console.log(awsError)
    }
     
  }

  if (isLoggedIn()) {

    return <Redirect to='/app/profile' noThrow/>
  }

  return (
   
    <React.Fragment>
      <Layout heading="Sign In">
        <form className={classes.form} onSubmit={handleSubmit(onSignIn)}>
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

       

          <Button
            type="submit"
            fullWidth
            variant="outlined"
            className={classes.submit}
          >
            Sign In
          </Button>

          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Sign Up
              </Link>
            </Grid>
            <Grid item>
              <Link href="#" variant="body2">
                Forgot password
              </Link>
            </Grid>
          </Grid>
        </form>
      </Layout>

      {/* not using watch to pass a prop. explicitely setting in prop */}
      {awsError !== null && <SnackBarMEssage message={awsError} />}
    </React.Fragment>
  );
};

//https://github.com/dabit3/gatsby-auth-starter-aws-amplify/blob/master/src/components/Login.js