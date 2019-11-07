import React from "react"
import {getUser} from './utils.js'
import Layout from '../components/layout.js'

//is a private route, wil be rerouted

export default () => {  
    return(
    <Layout>
    <h1>Your profile</h1>
    <ul>
      <li>{getUser().email}</li>
    </ul>
    </Layout>
)}


// https://www.gatsbyjs.org/tutorial/authentication-tutorial 