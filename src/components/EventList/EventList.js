import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import ApiContext from '../../ApiContext'
import Event from '../Event/Event'
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
    const location = e.target.cityState.value
    const type = e.target.type.value
    this.setState({
      type: type,
      location: location
    })
  }

  renderList = () => {
    let eventListByType = []
    let eventList = []
    if(this.state.type === 'All') {
      eventListByType = this.context.eventsAll
    } else if(this.state.type === 'Attending') {
      eventListByType = this.context.eventsAttending
    } else if(this.state.type === 'Created') {
      eventListByType = this.context.eventsCreated
    } else if(this.state.type === 'Hiking') {
      eventListByType = this.context.hikingEvents
    } else if(this.state.type === 'Biking') {
      eventListByType = this.context.bikingEvents
    } else if(this.state.type === 'Climbing') {
      eventListByType = this.context.climbingEvents
    } else if(this.state.type === 'Camping') {
      eventListByType = this.context.campingEvents
    } else if(this.state.type === 'Water') {
      eventListByType = this.context.waterEvents
    } else if(this.state.type === 'Other') {
      eventListByType = this.context.otherEvents
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
          id={event.id}
          name={event.name} 
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
            <input className="location-search" name="cityState" type="text" placeholder="city, state"></input>
            <select name="type">
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
            <button type="submit">search</button>
          </form>
        </div>
        <ul className="event-list">
          {this.renderList()}
        </ul>
      </div>
    ) 
  }
}

export default EventList