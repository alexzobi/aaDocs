import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchDocs, createDoc } from '../store/docs';
import { MiniFile } from './';

class Menu extends Component{
  constructor(props){
    super(props);
    this.state = {
      newFile: false,
      fileName: ""
    }
  }

  componentDidMount(){
    this.props.loadDocs();
  }

  handleNameChange = evt =>{
    evt.preventDefault();
    const fileName = evt.target.value;
    this.setState({fileName});
  }

  handleNewFile = () =>{
    const { fileName } = this.state;
    const { user } = this.props;
    this.props.newDoc(fileName,user);
  }

  render(){
    const { docs, user } = this.props;
    const { newFile, fileName } = this.state;
    return (
      <div id='menu'>
        {/* <h1>Welcome, {user}</h1> */}
        <button onClick={()=>this.setState({newFile: !newFile, fileName: ""})}>New Document</button>
        {
          newFile &&
          <div>
            <input onChange={this.handleNameChange}
              placeholder="Document Name"
              value={fileName} />
            <button disabled={!fileName.length} onClick={this.handleNewFile}>Submit</button>
          </div>
        }
        {
          docs && 
          Object.keys(docs).map((doc, idx) => {
            return (
              <MiniFile as={Link} to={`/editor/${doc}`}
                key={idx}
                doc={doc}
                details={docs[doc]} />
            );
          })
        }
      </div>
    );
  }
};

const mapState = state =>{
  return {
    docs: state.docs,
    user: state.user
  };
};

const mapDispatch = (dispatch,ownProps) =>{
  return {
    loadDocs: ()=>{
      dispatch(fetchDocs());
    },
    newDoc: (filename,issuer)=>{
      dispatch(createDoc(filename,issuer,ownProps.history));
    }
  };
};

export default connect(mapState, mapDispatch)(Menu);

