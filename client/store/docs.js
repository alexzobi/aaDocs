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
export const addDoc = doc => ({type: ADD_DOC, doc});

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

export const updateDoc = (filename, content, issuer) => dispatch =>{
  return axios
    .post(`https://aachallengeone.now.sh/update/${filename}`, {content, issuer})
    .then(res => res.data)
    .then( data => {
      if(data.success){
        // updates store upon post success only.
        // doing it this way prevents the need for an 
        // unnecessary fetch request to server to update
        // store with the created doc.
        const doc = {
          filename,
          details: {
            content,
            owners: [issuer],
            lastChangeBy: issuer,
          }
        };
        dispatch(addDoc(doc));
      }
    })
    .catch(err=> console.log(err));
}

export const createDoc = (filename, issuer, history) => dispatch =>{
  // the async request for posting a new doc
  const content = `Document created by ${issuer}.`;
  const data={issuer, content};

  return axios
    .post(`https://aachallengeone.now.sh/update/${filename}`, data)
    .then(res => res.data)
    .then( data => {
      if(data.success){
        // updates store upon post success only.
        // doing it this way prevents the need for an 
        // unnecessary fetch request to server to update
        // store with the created doc.
        const doc = {
          filename,
          details: {
            content,
            owners: [issuer],
            lastChangeBy: issuer,
          }
        };
        dispatch(addDoc(doc));
        history.push(`/editor/${filename}`);
      }
    })
    .catch(err=> console.log(err));
};

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
      const {filename, details} = action.doc;
      const newState = Object.assign({}, state, {[filename]: details});
      return newState;
    default:
      return state;
  }
}
