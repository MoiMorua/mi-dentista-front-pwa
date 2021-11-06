import React from "react";
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({ tokenP, rol, component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      component={(props) =>
        localStorage.getItem("token") 
        // &&
        // (localStorage.getItem("rol") == "Usuario" ||
        //   localStorage.getItem("rol") == "Admin")
        ? (
          <Component tokenP={tokenP} rol = {rol} />
        ) : (
          <Redirect
            to='/login'
            // {{
            //   pathname: "/login",
            //   state: { from: props.location },
            // }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;