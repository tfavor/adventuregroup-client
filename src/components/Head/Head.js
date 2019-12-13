import React, { Component } from 'react';
import './Head.css';
import {  Link } from 'react-router-dom'
import LogInForm from '../LogIn/LoginForm'
import ApiContext from '../../ApiContext'
import About from '../About/About'

class Head extends Component {

  static contextType = ApiContext;

  renderHead() {
    if(this.context.loggedIn === false) {
      return <LogInForm/>
    }
  }

  render() {
    return (
      <section className="head">
        <div className="head-container">
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing </p>
        </div>
      </section>
    )
  }
}

export default Head;