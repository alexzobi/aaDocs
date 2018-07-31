import React, {Component} from 'react';
import { connect } from 'react-redux';
import { setUser } from '../store';

// I chose to use a functional component for this to
// make the user input a controlled input and store the
// username locally until the user submits their name

class Login extends Component{
  constructor(props){
    super(props);
    this.state = {
      username: ''
    };
  }

  handleChange = evt =>{
    evt.preventDefault();
    const username = evt.target.value;
    this.setState({username});
  }

  render(){
    const {username} = this.state;
    const {handleLogin} = this.props;
    return (
      <div id="login">
        <input 
          onChange={this.handleChange}
          placeholder="Username" 
          value={username} />
        <button 
          disabled={!username.length}
          onClick={()=>handleLogin(username)}
          >Log In!
        </button>
      </div>
    );
  }
}

const mapDispatch = (dispatch, ownProps) =>{
  return {
    handleLogin: (username)=>{
      dispatch(setUser(username));
      ownProps.history.push('/menu');
    }
  };
};

export default connect(null, mapDispatch)(Login);