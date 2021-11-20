import React from "react";
import { Route, Redirect } from "react-router-dom";
import User from '../../requests/User'

const LoginRoute = ({ tokenP, rol, component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      component={(props) =>
        User.getToken()        
        ? (
            <Redirect
            to='/'            
          />
        ) 
        : 
        (
            <Component tokenP={tokenP} rol = {rol} />
        )
      }
    />
  );
};

export default LoginRoute;