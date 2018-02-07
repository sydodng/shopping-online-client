import React from 'react';
import logo from '../logo.svg';
import '../css/App.css';

function Header(props) {
	  return (
	    <div className="App">
	      <header className="App-header">
	      <img src={logo} className="App-logo" alt="logo" />
	      <h1 className="App-title">Product Management</h1>
	    </header>
	    </div>
	  );
	}


export default Header;