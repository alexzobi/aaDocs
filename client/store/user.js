/**
 * ACTION TYPES
 */
const SET_USER = 'SET_USER';
const REMOVE_USER = 'REMOVE_USER';

/**
 * INITIAL STATE
 */
const defaultUser = {};

/**
 * ACTION CREATORS
 */
export const setUser = user => ({ type: SET_USER, user });
export const removeUser = () => ({ type: REMOVE_USER });

/**
 * THUNK CREATORS
 */

 // If I asyncronously logging in and out users, this is where
 // I would create the thunks using axios. 

/**
 * REDUCER
 */
export default function(state = defaultUser, action) {
  switch (action.type) {
    case SET_USER: {
      return action.user;
    }
    case REMOVE_USER:
      return defaultUser;
    default:
      return state;
  }
}
