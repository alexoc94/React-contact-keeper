import React, { useReducer } from 'react';
import axios from 'axios';//using axios to make our requests
import AuthContext from './authContext';
import authReducer from './authReducer';
import setAuthToken from '../../utils/setAuthToken';
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_ERRORS
} from '../types';

const AuthState = props => {
  const initialState = {
    token: localStorage.getItem('token'),/*token will be stored in localStorage. 
    This is vanilla JS which allows us to access our browsers local storage and were going to look for an item called token*/
    isAuthenticated: null,//tells us weather were logged in or not
    loading: true,//loading will be true till we make a request and get a response back.
    user: null,//tells us what user were dealing with
    error: null
  };

  const [state, dispatch] = useReducer(authReducer, initialState);

  // Load User
  const loadUser = async () => {
    setAuthToken(localStorage.token);//if theres a token, put it through utils

    try {
      const res = await axios.get('/api/auth');//checks your token to see if your a valid user.

      dispatch({//if thats ok then dispatch
        type: USER_LOADED,
        payload: res.data//this is the actual user data
      });
    } catch (err) {
      dispatch({ type: AUTH_ERROR });
    }
  };

  // Register User
  const register = async formData => {//we use asynce here because we are making a request to the back end.
    const config = {
      headers: {//need this header for all post requests
        'Content-Type': 'application/json'
      }
    };

    try {
      const res = await axios.post('/api/users', formData, config);/*because we have the proxy scripts set we dont have to 
      enter http localhost for every request. This is hitting oru routes too*/

      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data//the payload is the response nd the response is a token.
      });

      loadUser();
    } catch (err) {
      dispatch({
        type: REGISTER_FAIL,
        payload: err.response.data.msg //returns the error message in 'users
      });
    }
  };

  // Login User
  const login = async formData => {//this gets the form data
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    try {
      const res = await axios.post('/api/auth', formData, config);//make a request to the route db via the

      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data
      });

      loadUser();
    } catch (err) {
      dispatch({
        type: LOGIN_FAIL,
        payload: err.response.data.msg
      });
    }
  };

  // Logout
  const logout = () => dispatch({ type: LOGOUT });

  // Clear Errors
  const clearErrors = () => dispatch({ type: CLEAR_ERRORS });

  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        loading: state.loading,
        user: state.user,
        error: state.error,
        register,
        loadUser,
        login,
        logout,
        clearErrors
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
