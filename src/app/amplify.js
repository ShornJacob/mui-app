import {Auth}  from "aws-amplify";  
  
  //https://github.com/dabit3/gatsby-auth-starter-aws-amplify/blob/master/src/components/SignUp.js
  export const signUp = async (username,password) => {
    try {
      await Auth.signUp({ username, password });
      return true
    } catch (err) {
      return err
    }
  }

  export const confirmSignUp = async(username , authCode) => {   
    try {
      // console.log(username)
      // console.log(authCode)
      await Auth.confirmSignUp(username, authCode)
      return true
    } catch (err) {
      return err
    }
  }

  export const signIn = async(username, password) => {

    try {
      await Auth.signIn(username, password)
      const user = await Auth.currentAuthenticatedUser()
      const userInfo = {
        ...user.attributes,
        username: user.username
      }
      return userInfo
    } catch (err) {
    }
  }