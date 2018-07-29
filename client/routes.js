import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Route, Switch } from 'react-router-dom';
import { Login, Editor, Menu } from './components';

class Routes extends Component{

  render(){
    const {isLoggedIn} = this.props;
    return (
      <Switch>
        <Route path="/editor/" 
                    render={({ match })=><Editor match={match}/>}
              />
        {
          // routes here are only available after 'logging in'
          isLoggedIn && (
            <Switch>
              {/* <Route path="/editor/:doc" 
                    render={({ match })=><Editor match={match}/>}
              /> */}
              <Route path="/menu" component={Menu} />
            </Switch>
          )
        }

        {/* the default route */}
        <Route exact path="*" component={Login} />
      </Switch>
    );
  }
}

const mapState = state =>{
  return {
    // this is a hack to get around the fact that I'm not
    // actually using auth. Prevents users from going to 
    // the editor before they've 'logged in'

    isLoggedIn: !!state.user.length
  };
};

export default withRouter(connect(mapState)(Routes));