import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
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
          Object.keys(docs).map((doc, idx) => {
            return (
              <li key={idx}>
                <Link to={`/docs/${doc}`}>
                  <h3>{doc}</h3>
                </Link>
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

