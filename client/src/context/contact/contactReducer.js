import {
  GET_CONTACTS,
  ADD_CONTACT,
  DELETE_CONTACT,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_CONTACT,
  FILTER_CONTACTS,
  CLEAR_FILTER,
  CONTACT_ERROR,
  CLEAR_CONTACTS
} from '../types';

export default (state, action) => {
  switch (action.type) {
    case GET_CONTACTS:
      return {
        ...state,
        contacts: action.payload,//fill contact state with payload(getapi) 
        loading: false
      };
    case ADD_CONTACT://in the case of add_contact
      return {//returna copy of the current state
        ...state,
        contacts: [action.payload, ...state.contacts],/*'contacts' is the name of the actual app level state
        get a copy of the contact state and fill it with the payload of add contacts*/
        loading: false
      };
    case UPDATE_CONTACT:
      return {
        ...state,
        contacts: state.contacts.map(contact =>//foreach contact take out the contact id and if that contact id= action payload id then return the updated contact
          contact._id === action.payload._id ? action.payload : contact
        ),
        loading: false
      };
    case DELETE_CONTACT:
      return {
        ...state,
        contacts: state.contacts.filter(
          contact => contact._id !== action.payload//reurns all contacts that arent the current id.
        ),
        loading: false
      };
    case CLEAR_CONTACTS:
      return {
        ...state,
        contacts: null,
        filtered: null,
        error: null,
        current: null//set everything back to null
      };
    case SET_CURRENT:
      return {
        ...state,
        current: action.payload
      };
    case CLEAR_CURRENT:
      return {
        ...state,
        current: null
      };
    case FILTER_CONTACTS:
      return {
        ...state,
        filtered: state.contacts.filter(contact => {/*The filtered part of the state, which by default is null,
          is set to the same as state.contacts so we can get all the contacts. Then we call the high order array method
          called filter*/
          const regex = new RegExp(`${action.payload}`, 'gi');//gi stands for global and case insensitive
          return contact.name.match(regex) || contact.email.match(regex);//return anything where the name/email matches the text thats passed in 
        })
      };
    case CLEAR_FILTER:
      return {
        ...state,
        filtered: null
      };
    case CONTACT_ERROR:
      return {
        ...state,
        error: action.payload
      };
    default:
      return state;
  }
};
