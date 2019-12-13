import React, { Component } from 'react';
import EventList from '../EventList/EventList'
import UsersEventList from '../UsersEventList/UsersEventList'
import './EventListContainer.css'


class EventListContainer extends Component {
  render() {
    return (
      <div className="event-list-container">
        <EventList/>
        <UsersEventList/>
      </div>
    )
  }
}

export default EventListContainer