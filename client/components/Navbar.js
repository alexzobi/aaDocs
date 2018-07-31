import React from 'react';
import history from '../history';
import { connect } from 'react-redux';
import { removeUser } from '../store/user';
import { socket } from '../socket';

const Navbar = props =>{
  return (
    <div id="navbar">
      <img src="/images/logo.png" />
      {
        props.user.length &&
        <div id="nav-items">
          <div id="nav-buttons"> 
            <button onClick={()=>history.push('/menu')}>Docs</button>
            <button onClick={()=>props.logout()}>Log Out</button> 
          </div>
          <h2>Hi, {props.user}!</h2>
        </div>
      }
    </div>
  );
};

const mapState = state =>{
  return {
    user: state.user
  };
};

const mapDispatch = (dispatch) =>{
  return {
    logout: ()=>{
      dispatch(removeUser());
      history.push('/');
      socket.close();
    }
  };
};

export default connect(mapState, mapDispatch)(Navbar);