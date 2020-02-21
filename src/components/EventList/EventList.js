import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import ApiContext from '../../ApiContext'
import Event from '../Event/Event'
import { eventListFunctionType, eventListFunctionLocation } from '../../events.helper'
import './EventList.css'

class EventList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      type: "All",
      location: '',
    }
  }

  static contextType = ApiContext;

  handleSubmit = (e) => {
    e.preventDefault()
    const location = e.target.location.value
    this.setState({
      location: location
    })
  }

  handleChange = (e) => {
    e.preventDefault()
    const type = e.target.value
    this.setState({
      type: type
    })
  }

  renderList = (eventListFunctiontypeType) => {
    let eventListByType = []
    let eventList = []
    if(this.context.filter === 'all') {
      eventListByType = this.context.eventsAll
    } else {
      eventListByType = eventListFunctionType(this.context.eventsAll, this.context.filter.toLowerCase())
    }

    if(this.state.location === '') {
      eventList = eventListByType
    } else {
      eventList = eventListByType.filter(event => event.location === this.state.location)
    }
    return (
      <>
      {eventList.map(event => 
        <li className="event-list-item" key={event.id}>
          <Event
          event={event}
          />
        </li>)}
      </>
    )
  }

  render() {
    return (
      <div className="events">
        <div className="event-search-form-container">
        </div>
        <div>
        <ul className="event-list">
          {this.renderList(eventListFunctionType)}
        </ul>
        </div>
      </div>
    ) 
  }
}

export default EventList