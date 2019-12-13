import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import ApiContext from '../../ApiContext'
import './Event.css'

class Event extends Component {
  render() {
    return (
      <div className="event">
        <Link
        className="event-link"
        to={`/event/${this.props.id}`}>
          <div className="event-img">img</div>
          <h2>{this.props.name}</h2>
        </Link>
      </div>
    )
  }
}

export default Event