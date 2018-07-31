import React from 'react';
import { Link } from 'react-router-dom';

const MiniFile = props =>{

  const srcObj = {
    'doc':'/images/doc.png',
    '.md' : '/images/md.png',
    'txt' : '/images/txt.png' 
  };

  const fileType = name =>{
    const type = name.slice(-3)
    return srcObj[type] ? srcObj[type] : srcObj.txt;
  }

  return (
    <Link to={`/editor/${props.doc}`} className="file">
        <h3>{props.doc}</h3>
        <img src={fileType(props.doc)} />
        <h4>Last Edit By:</h4>
        <h5>{props.details.lastChangeBy}</h5>
    </Link>
  );
};

export default MiniFile;