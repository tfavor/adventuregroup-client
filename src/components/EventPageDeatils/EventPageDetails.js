import React, { Component } from 'react';
import './EventPageDetails.css'
import ApiContext from '../../ApiContext'
import config from '../../config'

class EventPageDetails extends Component {
  render() {
    return (
      <div className="details">
            <div className="date">
                <h3>date/time</h3>
                <p>{this.props.event.date}</p>
            </div>
            <div className="location">
                <h3>location</h3>
                <p>{this.props.event.location}</p>
            </div>
            <div className="desc">
                <h3>details</h3>
                <p>{this.props.event.details}</p>
            </div>
        </div>
    )
  }
}

export default EventPageDetails