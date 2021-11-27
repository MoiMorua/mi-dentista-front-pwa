import React from "react";
import { Route, Redirect } from "react-router-dom"
import User from '../../requests/User'
import { useSelector } from "react-redux";
import { selectUser } from '../../reducers/UserReducer'

const PrivateRoute = ({ tokenP, rol, component: Component, ...rest }) => {
  const user = useSelector(selectUser) 

  return (
    <Route
      {...rest}
      component={(props) =>
        localStorage.getItem('token')&&localStorage.getItem('expires_on')&&localStorage.getItem('user')&&localStorage.getItem('date')
        ? (
          <Component tokenP={tokenP} props={props} rol = {rol} />
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