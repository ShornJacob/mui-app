import React from "react"
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import PersonOutlineRoundedIcon from "@material-ui/icons/PersonOutlineRounded";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles(theme => ({
    paper: {
      marginTop: theme.spacing(8),
      display: "flex",
      flexDirection: "column",
      alignItems: "center"
    }
  }));


export default ({ heading ,children }) => {

    const classes = useStyles();
    
    return(
        <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar>
            <PersonOutlineRoundedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            {heading}
          </Typography>
        </div>
        {children}
      </Container>
)}

//https://www.gatsbyjs.org/docs/layout-components/