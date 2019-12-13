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
    return (
      <nav className="navbar">
        <Link className="title" to="/" style={{ textDecoration: 'none' }}>AdventureGroup</Link>
        <div className="buttons">
            <Link 
              className="create-event-link" 
              to="/create_event" 
              style={{ textDecoration: 'none' }}>create event</Link>
            {isLoggedIn 
                ? (<Link 
                     className="logout-link" 
                     to="/"
                     style={{ textDecoration: 'none' }}
                     onClick={this.handleLogout}>log out</Link>) 
                : (<Link 
                      className="login-link"
                      to="/login"
                      style={{ textDecoration: 'none' }}>log in</Link>)
            }
            <Link 
              className="signup-link" 
              to="/signup" 
              style={{ textDecoration: 'none' }}>sign up</Link>
        </div>
      </nav>
    )
  }
}

export default Nav;