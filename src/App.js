import React from "react";
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
import useForm from "react-hook-form"

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
    const {register, handleSubmit, errors, watch} = useForm()

  const onSubmit = values => console.log(values)

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
            inputRef={register ({
              pattern : {
                value : /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
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
            inputRef={register ({
              minLength : {
                value : 8
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
              validate: (value) => value === watch('password')
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
      </div>
    </Container>
  );
}

export default App;

//https://github.com/mui-org/material-ui/blob/master/docs/src/pages/getting-started/templates/sign-in/SignIn.js

//https://material-ui.com/api/container/
//component	elementType	The component used for the root node. Either a string to use a DOM element or a component.

//https://material-ui.com/components/avatars/
//Avatars are found throughout material design

//https://material-ui.com/components/material-icons/

//https://v3.material-ui.com/api/typography/

//https://material.io/design/typography/#type-scale
//The type scale is a combination of 13 styles that are supported by the type system.

//https://material-ui.com/api/typography/
//component - The component used for the root node. Either a string to use a DOM element or a component. By default, it maps the variant to a good default headline component.

//variant - Applies the theme typography styles.

//https://material-ui.com/api/text-field/
//variant
// 'standard'
// | 'outlined'
// | 'filled

//margin
//none dense normal

//If true, the label is displayed as required and the input element` will be required

//autoFocus,If true, the input element will be focused during the first mount

//https://material-ui.com/api/button/

//button type submit is for form
//fullWidth	bool	false	If true, the button will take up the full width of its container.
//variant text outlined contained
//color - default, inherit, primary secondary

//https://material-ui.com/customization/spacing/
//padding: theme.spacing(1, 2), // '8px 16px'

//https://material-ui.com/api/grid/
//container		If true, the component will have the flex container behavior. You should be wrapping items with a container.

//item		If true, the component will have the flex item behavior. You should be wrapping items with a container.
//xs Defines the number of grids the component is going to use. It's applied for all the screen sizes with the lowest priority.

//https://stackoverflow.com/questions/54624099/what-is-the-purpose-of-boolean-values-for-the-breakpoint-props-xs-sm-md-i
//https://github.com/mui-org/material-ui/blob/master/packages/material-ui/src/Grid/Grid.js
//size === true
//flexBasis: 0,
//flexGrow: 1,
//maxWidth: '100%'

//The flex-basis CSS property sets the initial main size of a flex item. It sets the size of the content box unless otherwise set with box-sizing.
//The flex-grow CSS property sets the flex grow factor of a flex item main size. It specifies how much of the remaining space in the flex container should be assigned to the item (the flex grow factor).
//https://www.w3schools.com/cssref/pr_dim_max-width.asp
//%	Defines the maximum width in percent of the containing block

//Text Field error	bool		If true, the label will be displayed in an error state.


//https://medium.com/javascript-in-plain-english/react-refs-both-class-and-functional-components-76b7bce487b8
//using refs in material ui
//react hook form uses refs
//name is unique identofier for react hook form
//https://react-hook-form.com/api#register

//https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript

//https://react-hook-form.com/api/#validationSchema