import React, {Component} from 'react';
import { connect } from 'react-redux';
import { fetchDocs } from '../store/docs';

class Menu extends Component{

  componentDidMount(){
    this.props.loadDocs();
  }

  render(){
    const {docs} = this.props;
    return (
      <div id='menu'>
        <h1>Welcome, {this.props.username}</h1>
        <button onClick={()=>console.log('new!')}>New Document</button>
        <ul>
        {
          docs && 
          docs.map(doc => {
            return (
              <li key={doc.title}>
                <h3>{doc.title}</h3>
              </li>
            );
          })
        }
        </ul>
      </div>
    );
  }
};

const mapState = state =>{
  return {
    docs: state.docs,
    username: state.username
  };
};

const mapDispatch = dispatch =>{
  return {
    loadDocs: ()=>{
      dispatch(fetchDocs());
    }
  };
};

export default connect(mapState, mapDispatch)(Menu);

