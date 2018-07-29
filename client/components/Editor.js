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
      lastChangeBy: "",
      charCount: 0,
      lastSaved: new Date().toLocaleString()
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
        const charCount = content.length;
        this.setState({content, lastChangeBy, owners, charCount});
      })
      .catch(err =>console.error(err)); 
    this.refs.textarea.addEventListener('input', this.handleChange);
  }

  componentWillUnmount(){
    this.refs.textarea.removeEventListener('input', this.handleChange);
  }


  handleChange = evt =>{
    evt.preventDefault();
    const content = evt.target.innerHTML;
    const charCount = content.length;
    this.setState({content, charCount});
    if(charCount%50===0){
      this.handleSave();
    }
  }

  handleSave = () =>{
    const { content } = this.state;
    const { user } = this.props;
    const regex = new Regex('/[<script>].*[<\/script>]*/','gm');
    if(content.search(regex)>=0){
      content = "no hacking please.";
    }
    this.props.saveDoc(content, user);
    this.setState({lastSaved: new Date().toLocaleString()});
  }

  render(){
    const { content, lastSaved } = this.state;
    console.log(content);
    return (
      <div id="editor">
        <div id="toolbar">
          <button id="save" onClick={this.handleSave}>Save</button>
          <p>{`Last Save: ${lastSaved}`}</p>
        </div>
        <div id="textarea" 
          ref="textarea" 
          contentEditable
          dangerouslySetInnerHTML={{__html:content}}
          />
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