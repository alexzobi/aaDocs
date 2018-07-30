import React from 'react';
import history from '../history';
import { connect } from 'react-redux';
import { removeUser } from '../store/user';

const Navbar = props =>{
  return (
    <div id="navbar">
      <img src="/images/logo.png" />
      {
        props.user.length &&
        <div> 
          <button onClick={()=>history.push('/menu')}>My Docs</button>
          <button onClick={()=>props.logout()}>Log Out</button> 
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
    }
  };
};

export default connect(mapState, mapDispatch)(Navbar);