import * as user_actions from '../actions/user_actions'


const loggedIn = localStorage.getItem('logged_in') == '1';
const userLoggedIn = {
  displayName: 'Admin',
  loggedIn: true,
};
const userGuest = {
  displayName: 'Guest',
  loggedIn: false,
};
const user = loggedIn ? userLoggedIn : userGuest;


export default (state = user, action) => {
  switch (action.type) {
    case user_actions.LOGIN_SEND:
      return {
        ...state,
        sending: true,
      }
    case user_actions.LOGIN_DONE:
      localStorage.setItem('logged_in', '1');
      return {
        ...state,
        displayName: action.user.login,
        loggedIn: true,
        sending: false,
        message: action.user.message,
        error: false,
      }
    case user_actions.LOGIN_FAIL:
      return {
        ...state,
        sending: false,
        error: action.error.message,
      }
      

    case user_actions.LOGOUT_SEND:
      return {
        ...state,
        sending: true,
      }
    case user_actions.LOGOUT_DONE:
      localStorage.setItem('logged_in', '0');
      return {
        ...state,
        displayName: userGuest.displayName,
        loggedIn: false,
        sending: false,
        message: action.user.message,
        error: false,
      }
    case user_actions.LOGOUT_FAIL:
      return {
        ...state,
        sending: false,
        error: action.error.message,
      }

    default:
      return state;
  }
};