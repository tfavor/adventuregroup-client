import React, { Component } from 'react';
import './Nav.css';
import { Route, Link } from 'react-router-dom'
import ApiContext from '../../ApiContext'

class Nav extends Component {
   
  static contextType = ApiContext;

  handleLogout = () => {
    this.context.handleLogout()
  }

  render() {
      const isLoggedIn = this.context.loggedIn
      console.log(isLoggedIn)
    return (
      <nav className="navbar">
        <Link className="title" to="/" style={{ textDecoration: 'none' }}>AdventureGroup</Link>
        <div className="buttons">
          
            {isLoggedIn 
                ? (<Link 
                     className="logout-link" 
                     to="/"
                     style={{ textDecoration: 'none' }}
                     onClick={this.handleLogout}>Log Out</Link>) 
                : (<div className="login/signup-link">
                    <Link 
                      className="login-link"
                      to="/login"
                      style={{ textDecoration: 'none' }}>Log In</Link>
                    <Link 
                      className="signup-link" 
                      to="/signup" 
                      style={{ textDecoration: 'none' }}>Sign Up</Link>
                </div>)
            }
        </div>
      </nav>
    )
  }
}

export default Nav;