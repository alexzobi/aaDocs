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

    // custom event listener for changes on text area
    this.refs.textarea.addEventListener('input', this.handleChange);
  }

  componentWillUnmount(){
    // removes event listener to prevent listener overload
    this.refs.textarea.removeEventListener('input', this.handleChange);
  }

  handleChange = evt =>{
    let el = document.getElementById("textarea");
    let range = document.createRange();
    let sel = window.getSelection();

    // grabbing the html
    const content = evt.target.innerHTML;

    // monitoring character count
    const charCount = evt.target.innerText.length;

    // setting state with updated info
    this.setState({content, charCount});

    // automatically saving every n characters
    let n=50;
    if(charCount%n===0){
      this.handleSave();
    }

    // the real fun. because we want our users to be able 
    // to use things like 'bold', 'italics' etc, we want to
    // use a content editable div. the problem is that with 
    // a controlled content editable div where the div's value
    // is equal to local state, the cursor will automatically reset
    // to the first position of the div after every key press.
    // to prevent that from happening, we must create a range and 
    // dynamically adjust it's location and then set the focus on
    // element to our calculated range. I'm not ashamed to say this
    // took a while. 


    let lastChild=el.lastChild;

    // hitting the enter key inserts a new div. using bold or italics
    // also creates child nodes. to handle this, we must iterively
    // check for a last child.
    while(lastChild.lastChild){
      lastChild = lastChild.lastChild;
    }
    let offset = lastChild.length;
    range.setStart(lastChild, offset);
    range.collapse(true);
    sel.removeAllRanges();
    sel.addRange(range);
    el.focus();
  }

  handleSave = () =>{
    const { content } = this.state;
    const { user } = this.props;

    // checks to make sure there is no attempts at XSS.
    // normally React automatically prevents this, but
    // with the 'dangerouslysetinnerhtml' attribute, one
    // can never be too cautious.
    const regex = new RegExp('(&lt;script&gt;|&lt;/script&gt;)','gm');
    if(content.search(regex)<0){
      this.props.saveDoc(content, user);
      this.setState({lastSaved: new Date().toLocaleString()});
    } else {
      alert("Please don't try to hack my editor");
    }
  }

  render(){
    const { content, lastSaved } = this.state;
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