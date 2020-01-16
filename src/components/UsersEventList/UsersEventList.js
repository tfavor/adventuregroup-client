import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import ApiContext from '../../ApiContext'
import Event from '../Event/Event'
import img from '../../images/default-event-img.jpg'
import { attendingFunction, createdFunction } from '../../events.helper'
import './UsersEventList.css'

class UsersEventList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      type: "Attending"
    }
  }

  static contextType = ApiContext;

  handleChange = (event) => {
    const value = event.target.value
    this.setState({
      type: value
    })
  }



  renderList = (attendingFunction, createdFunction) => {
    let eventList = []
    const eventsIds = []
    const events = []
    if(this.state.type === 'Attending') {
      eventList = this.context.eventsAttending
    } else if(this.state.type === 'Created') {
      eventList = this.context.eventsCreated
    }

    for(let i = 0; i < eventList.length; i++) {
     eventsIds.push(eventList[i].event_id)
    }

    
    for(let i = 0; i < eventsIds.length; i++) {
      events.push(this.context.eventsAll.find(event => event.id === eventsIds[i]))
    }
    
    return (
      <>
      {events.map(event => 
        <li className="user-event-list-item" key={event.id}>
          <div className="user-event">
            <Link
            className="user-event-link"
            to={`/event/${event.id}`}
            style={{ textDecoration: 'none' }}>
              <img className="user-event-img" src={img}></img>
              <div className="info">
                <p className="date">{event.date}</p>
                <h2 className="name">{event.name}</h2>
                <p className="location">{event.location}</p>
                
              </div>
            </Link>
          </div>
        </li>)}
      </>
    )
  }

  render() {
    return (
      <div className="user-events">
        <div className="user-event-search-form-container">
          <select onChange={this.handleChange}>
            <option value="Attending">Events you are attending</option>
            <option value="Created">Events you created</option>
          </select>
        </div>
        <ul className="user-event-list">
          {this.renderList(attendingFunction , createdFunction)}
        </ul>
      </div>
    ) 
  }
}

export default UsersEventList