import axios from 'axios';

/**
 * ACTION TYPES
 */
const GET_DOCS = 'GET_DOCS';
const ADD_DOC = 'ADD_DOC';

/**
 * INITIAL STATE
 */
const initialState = [];

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
      // the data is coming in as an object of objects. 
      // were I to set up the back end, I would send an array
      // of objects instead to make using the data on the 
      // front end easier.
      const titles = Object.keys(res.data);
      let docs = res.data;
      titles.forEach((title) =>{
        docs[title].title = title;
      });
      console.log('the docs', docs);
      const state = Object.values(docs);
      return dispatch(getDocs(state || initialState));
    })
    .catch(err => console.log(err));

/**
 * REDUCER
 */
export default function(state = initialState, action) {
  switch (action.type) {
    case GET_DOCS: {
      const newState = action.docs;
      console.log('new state', newState)
      return newState;
    }
    case ADD_DOC:
      return initialState;
    default:
      return state;
  }
}
