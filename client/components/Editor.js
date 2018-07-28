import React, { Component } from 'react';
import { connect } from 'react-redux';

class Editor extends Component{
  constructor(props){
    super(props);
    this.state = {
      content: "",
      owners:[],
      lastChangedBy: ""
    };
  }

  componentDidMount(){
    const {doc} = this.props.match.params;
    console.log('the doc', doc)
    const {content, owners, lastChangedBy} = this.props.docs[doc];
    this.setState({content, lastChangedBy, owners});
  }

  render(){
    console.log('editor props', this.props)
    console.log('local state', this.state)
    const { content } = this.state;
    return (
      <div>
        <p>{content}</p>
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

export default connect(mapState)(Editor);