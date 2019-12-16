import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import ApiContext from '../../ApiContext'
import img from '../../images/default-event-img.jpg'
import './Event.css'

class Event extends Component {
  render() {
    return (
      <div className="event">
        <Link
        className="event-link"
        to={`/event/${this.props.event.id}`}
        style={{ textDecoration: 'none' }}>
          <img className="event-img" src={img}></img>
            <div className="info">
              <p className="event-date">{this.props.event.date}</p>
              <h2 className="event-name">{this.props.event.name}</h2>
              <p className="event-location">{this.props.event.location}</p>
              <p className="event-user-number">{this.props.event.users_attending.length} going</p>
            </div>
        </Link>
      </div>
    )
  }
}

export default Event