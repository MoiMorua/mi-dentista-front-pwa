import React from "react";
import { Route, Redirect } from "react-router-dom"
import User from '../../requests/User'
import { useSelector } from "react-redux";
import { selectUser } from '../../reducers/UserReducer'

const PrivateRoute = ({ tokenP, rol=[], component: Component, ...rest }) => {  

  console.log(rol)
  console.log(rol.find(r => {    
    return r == localStorage.getItem('user_role')
  }
  ))

  return (
    <Route
      {...rest}
      component={(props) =>
        localStorage.getItem('token')&&rol.find(r => r == localStorage.getItem('user_role'))
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