import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchDocs, createDoc } from '../store/docs';

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
        <h1>Welcome, {user}</h1>
        <button onClick={()=>this.setState({newFile: !newFile, fileName: ""})}>New Document</button>
        {
          newFile &&
          <div>
            <input onChange={this.handleNameChange}
              placeholder="Document Name"
              value={fileName} />
            <button onClick={this.handleNewFile}>Submit</button>
          </div>
        }
        <ul>
        {
          docs && 
          Object.keys(docs).map((doc, idx) => {
            return (
              <li key={idx}>
                <Link to={`/editor/${doc}`}>
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

