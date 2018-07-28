import React, { Component } from 'react';
import { connect } from 'react-redux';

class Editor extends Component{
  constructor(props){
    super(props);
    this.state = {
      content: this.props.content
    };
  }

  // componentDidMount(){

  // }

  render(){
    const { content } = this.state;
    return (
      <div>
        <p>{content}</p>
      </div>
    );
  }
}