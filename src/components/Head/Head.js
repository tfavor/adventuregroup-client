import React, { Component } from 'react';
import './Head.css';
import {  Link } from 'react-router-dom'
import ApiContext from '../../ApiContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faPlus } from '@fortawesome/free-solid-svg-icons'
import About from '../About/About'
import img from '../../images/header.jpg'
class Head extends Component {

  static contextType = ApiContext;



  render() {
    return (
      <section className="head">
          <h1 className="header">Welcome to AdventureGroup</h1>
          <p className="quote">Find your friends and your adventure</p>
          <form className="event-searchg-form" onSubmit={this.handleSubmit}>
            <input type="text" name="location" placeholder="city, state"/>
            <button type="submit"><FontAwesomeIcon icon={faSearch} /></button>
          </form>
          <Link 
              className="create-event-link" 
              to="/create_event" 
              style={{ textDecoration: 'none' }}><FontAwesomeIcon id="plus" icon={faPlus} />  create an event</Link>
        
      </section>
    )
  }
}

export default Head;
/*<div className="head-container"></div>
<img src={img}></img>*/