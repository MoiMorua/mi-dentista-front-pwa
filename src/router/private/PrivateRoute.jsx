import React from "react";
import { Route, Redirect } from "react-router-dom"
import User from '../../requests/User'

const PrivateRoute = ({ tokenP, rol, component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      component={(props) =>
        User.getToken()        
        ? (
          <Component tokenP={tokenP} rol = {rol} />
        ) : (
          <Redirect
            to='/login'            
          />
        )
      }
    />
  );
};

export default PrivateRoute;