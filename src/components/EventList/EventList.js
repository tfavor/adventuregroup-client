import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import ApiContext from '../../ApiContext'
import Event from '../Event/Event'
import { eventListFunction } from '../../events.helper'
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

  renderList = (eventListFunction) => {
    let eventListByType = []
    let eventList = []
    if(this.state.type === 'All') {
      eventListByType = this.context.eventsAll
    } else {
      eventListByType = eventListFunction(this.context.eventsAll, this.state.type.toLowerCase())
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
          <form className="event-searchg-form" onSubmit={this.handleSubmit}>
            <input type="text" name="location" placeholder="city, state"/>
            <button type="submit">search</button>
          </form>
        </div>
        <div>
        <div className="event-select-container">
          <select name="type" onChange={this.handleChange}>
            <option value="All">All Events</option>
            <option value="Attending">Events you are attending</option>
            <option value="Created">Events you created</option>
            <option value="Hiking">Hiking Events</option>
            <option value="Biking">Biking Events</option>
            <option value="Climbing">Climbing Events</option>
            <option value="Camping">Camping Events</option>
            <option value="Water">Water Events</option>
            <option value="Other">Other Events</option>
          </select>
        </div> 
        <ul className="event-list">
          {this.renderList(eventListFunction)}
        </ul>
        </div>
      </div>
    ) 
  }
}

export default EventList