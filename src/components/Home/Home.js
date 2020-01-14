import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom'
import Head from '../Head/Head'
import EventList from '../EventList/EventList'
import UsersEventList from '../UsersEventList/UsersEventList'
import ApiContext from '../../ApiContext'

import EventListContainer from '../EventListContainer/EventListContainer'
import './Home.css'

class Home extends Component {

  static contextType = ApiContext;

  renderUsersEvents = () => {
    const loggedIn = this.context.loggedIn
    if(loggedIn) {
      return (<UsersEventList/>)
    }
  }

  render() {
    return (
      <div className="home">
        <Head/>
        {this.renderUsersEvents()}
        <EventList/>
      </div>
    )
  }
}

export default Home