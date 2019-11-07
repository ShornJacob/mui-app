//https://www.gatsbyjs.org/docs/layout-components/

import React from "react"
import AppBar from './appbar'

export default ({ children }) => (
  <React.Fragment>
      <AppBar/>
      {children}
  </React.Fragment>
    
)