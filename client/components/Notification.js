import React, {Component} from 'react';

class Notification extends Component{
  // component for displaying socket notifications. 
  // when a notification occurs, component slides in
  // from the bottom right of the screen.

  constructor(){
    super();
    this.state = {
      currentMessage: null,
      messages: [],
      active: false
    };
    this.types = {
      new: ' created ',
      join: ' has joined ',
      patch: ' has edited '
    };

    // create socket connection
    this.socket = new WebSocket('wss://aachallengeone.now.sh');

    this.socket.onerror = (err) =>{
      console.error(err);
    };
    
    // handle messages from server
    this.socket.onmessage = message =>{
      try {
        let json = JSON.parse(message.data);
        const { messages } = this.state;
        messages.push(json);
        this.setState({currentMessage: json, messages, active: true});
      } catch (e) {
        console.error(e);
        return;
      }
    };
  }

  handleDismiss = ()=>{
    const { messages } = this.state;
    messages.pop();
    const currentMessage = messages.length 
      ? messages[messages.length-1] 
      : null;
    this.setState({messages, currentMessage, active: false});
  }

  componentWillUnmount(){
    // close socket connection when component unmounts.
    this.socket.close();
  }
  
  render(){
    const { currentMessage, active } = this.state;
    return (
      <div id="notification" data-activated={active}>
        {
          currentMessage &&
          <h4>{currentMessage.issuer} {this.types[currentMessage.type]} {currentMessage.file}!</h4>
        }
        <button 
          onClick={()=>this.handleDismiss()} 
          id="dismiss"
          >Dismiss</button>
      </div>
    );
  }
}

export default Notification;