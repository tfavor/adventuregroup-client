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
        <div className="buttons">
            <button>create event</button>
            {isLoggedIn 
                ? (<button>log in</button>) 
                : (<button>sign up</button>)
            }
        </div>
      </nav>
    )
  }
}

export default Nav;