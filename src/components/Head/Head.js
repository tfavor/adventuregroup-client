import React, { Component } from 'react';
import './Head.css';
import {  Link } from 'react-router-dom'
import ApiContext from '../../ApiContext'
import About from '../About/About'
import img from '../../images/header.jpg'
class Head extends Component {

  static contextType = ApiContext;



  render() {
    return (
      <section className="head">
        
          <img src={img}></img>
          <p className="quote">Find your friends and find your adventure</p>
        
      </section>
    )
  }
}

export default Head;
/*<div className="head-container"></div>*/