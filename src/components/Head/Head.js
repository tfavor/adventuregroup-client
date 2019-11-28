import React, { Component } from 'react';
import './Head.css';
import {  Link } from 'react-router-dom'
import LogInForm from '../LogIn/LoginForm';

class Head extends Component {
    constructor(props) {
        super(props)
        this.state={
            isLoggedIn: false,
        }
    }

  render() {
      const isLoggedIn = this.state.isLoggedIn
    return (
      <section className="head">
        <LogInForm/>
      </section>
    )
  }
}

export default Head;