import React, { Component } from 'react';
import { connect } from 'react-redux';

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
    const {content, owners} = this.props.docs[doc];
    const lastChangeBy = this.props.user;
    this.setState({content, lastChangeBy, owners});
  }

  handleChange = evt =>{
    const content = evt.target.value;
    this.setState({content});

  }

  render(){
    const { content } = this.state;
    return (
      <div>
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

export default connect(mapState)(Editor);