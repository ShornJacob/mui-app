import React, { useState } from "react";
import { useStyles } from "./styles";
import { confirmSignUp } from "./amplify";
import useForm from "react-hook-form";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { navigate } from "@reach/router";
import SnackBarMEssage from "./snackbar";

export default ({ email }) => {
//   console.log(email);
  const classes = useStyles();

  //state ise set to message that needs to be displayed always
  const [awsError, setawsError] = useState(
    "An Authorisation has been sent to the email. Please confirm the code."
  );
  

  const { register, handleSubmit, errors } = useForm();

  //values has to be first, its not explicit
  //not pass email, its accesible inside the functionnpm start
  const onConfirm = async (values) => {
    // console.log(email)
    // console.log(values.authCode)
    const confirmStatus = await confirmSignUp(email, values.authCode);

    if (confirmStatus === true) {
      console.log("Confirmation success");
      navigate("/user");
    } else {
    //   
      setawsError(confirmStatus);
      console.log(confirmStatus);
    }
  };

 
  return (
    <React.Fragment>
      <form className={classes.form} onSubmit={handleSubmit(onConfirm)}>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="authCode"
          label="Auth Code"
          name="authCode"
          autoFocus
          error={!!errors.authCode}
          inputRef={register({
            minLength: {
              value: 4
            }
          })}
          helperText={errors.authCode && "Auth Code is 4 digit"}
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

      <SnackBarMEssage message={awsError} />
    </React.Fragment>
  );
};
