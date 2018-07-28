import axios from 'axios';

/**
 * ACTION TYPES
 */
const GET_DOCS = 'GET_DOCS';
const ADD_DOC = 'ADD_DOC';

/**
 * INITIAL STATE
 */
const initialState = {};

/**
 * ACTION CREATORS
 */
export const getDocs = docs => ({ type: GET_DOCS, docs });

/**
 * THUNK CREATORS
 */

export const fetchDocs = () => dispatch => 
  // the async request to get the docs on file
  axios
    .get('https://aachallengeone.now.sh/read')
    .then(res => {
      dispatch(getDocs(res.data || initialState))
    })
    .catch(err => console.log(err));

/**
 * REDUCER
 */
export default function(state = initialState, action) {
  switch (action.type) {
    case GET_DOCS: {
      const newState = action.docs;
      return newState;
    }
    case ADD_DOC:
      return initialState;
    default:
      return state;
  }
}
