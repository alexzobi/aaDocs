// create a history object that can be passed around and used at will.

import createHistory from 'history/createBrowserHistory';
import createMemoryHistory from 'history/createMemoryHistory';

const history =
  process.env.NODE_ENV === 'test' ? createMemoryHistory() : createHistory();

export default history;
