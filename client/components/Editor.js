import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateDoc } from '../store';
import axios from 'axios';

class Editor extends Component{
  constructor(props){
    super(props);
    this.state = {
      content: "",
      owners:[],
      lastChangeBy: ""
    };
  }

  componentDidMount(){
    const {doc} = this.props.match.params;
    // const {content, owners, lastChangeBy} = this.props.docs[doc];
    // this.setState({content, lastChangeBy, owners});
    axios
      .get(`https://aachallengeone.now.sh/read/doraemon.doc`)
      .then( res => res.data)
      .then(data =>{
        const {content, owners, lastChangeBy} = data;
        this.setState({content, lastChangeBy, owners});
      })
      .catch(err =>console.error(err));
  }


  handleChange = evt =>{
    const content = evt.target.value;
    this.setState({content});

  }

  handleSave = () =>{
    const { content } = this.state;
    const { user } = this.props;
    this.props.saveDoc(content, user);
  }

  render(){
    const { content } = this.state;
    return (
      <div id="editor">
        <div id="toolbar" >
          <button id="save" onClick={this.handleSave}>Save</button>
        </div>
        <textarea
          value={content} 
          onChange={this.handleChange} />
      </div>
    );
  }
}

const mapState = state =>{
  return {
    user: state.user,
    docs: state.docs
  };
};

const mapDispatch = (dispatch, ownProps) =>{
  return {
    saveDoc: (content, user)=>{
      dispatch(updateDoc('doraemon.doc',content, user));
    }
  };
};

export default connect(mapState, mapDispatch)(Editor);