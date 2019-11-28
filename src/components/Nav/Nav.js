import React, { Component } from 'react';
import './Nav.css';
import { Route, Link } from 'react-router-dom'

class Nav extends Component {
    constructor(props) {
        super(props)
        this.state={
            isLoggedIn: false,
        }
    }

  render() {
      const isLoggedIn = this.state.isLoggedIn
    return (
      <nav className="navbar">
        <h1>AdventureGroup</h1>
        <div class="buttons">
            <button onclick="window.location.href = '../create-event/create-event-name/create-event-name.html'">create event</button>
            {isLoggedIn 
                ? (<button onclick="window.location.href = '../signup/signup.html'">log in</button>) 
                : (<button onclick="window.location.href = '../signup/signup.html'">sign up</button>)
            }
        </div>
      </nav>
    )
  }
}

export default Nav;