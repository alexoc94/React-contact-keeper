import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import AuthContext from '../../context/auth/authContext';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const authContext = useContext(AuthContext);
  const { isAuthenticated, loading } = authContext;
  return (
    <Route //get the restbof the props
      {...rest}
      render={props =>
        !isAuthenticated && !loading ? (
          <Redirect to='/login' />
        ) : (
          <Component {...props} /> //load that component and its extra props
        )
      }
    />
  );
};

export default PrivateRoute;
