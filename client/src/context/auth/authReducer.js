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

export default (state, action) => {
  switch (action.type) {
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: action.payload
      };
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      localStorage.setItem('token', action.payload.token);//setting token to local storage, found in payload.
      return {
        ...state,
        ...action.payload,//puts the token in the state
        isAuthenticated: true,
        loading: false
      };
    case REGISTER_FAIL:
    case AUTH_ERROR:
    case LOGIN_FAIL:
    case LOGOUT:
      localStorage.removeItem('token');//remove token and reset everything.
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        user: null,
        error: action.payload //the payload in this instance is the error message which wel be able to see in our state
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null
      };
    default:
      return state;
  }
};
