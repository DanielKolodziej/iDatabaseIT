import React from 'react';
import { Link } from 'react-router-dom';

const divStyle = {
    textAlign: 'center',
    marginTop: '10rem',
};

function Home(){
    return(
        <div style={divStyle}>
            <h1 className="ui header" style={{fontSize: '400%'}}>Welcome</h1>
            <Link to={`/create`}><button className="ui primary button"><i className="plus square icon"></i>Add New Entry</button></Link>
            <Link to={`/index`}><button className="ui primary button"><i className="search icon"></i>Search Library</button></Link>
        </div>
    )
}

export default Home;