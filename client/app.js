import React from 'react';
import Routes from './routes';
import { Navbar, Notification} from './components';

const App = () => {
  return (
    <div>
      <Navbar /> 
      <Routes />
      <Notification />
    </div>
  );
};

export default App;
