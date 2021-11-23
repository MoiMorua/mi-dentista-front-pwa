import React from "react";
import { Route, Redirect } from "react-router-dom";
import User from '../../requests/User'
import {selectUser} from '../../reducers/UserReducer'
import {useSelector} from 'react-redux'

const LoginRoute = ({ tokenP, rol, component: Component, ...rest }) => {
  const user = useSelector(selectUser)
  return (
    <Route
      {...rest}
      component={(props) =>
        user
        ? 
        (
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