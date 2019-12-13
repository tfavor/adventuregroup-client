import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import ApiContext from '../../ApiContext'
import Event from '../Event/Event'
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

  renderList = () => {
    let eventList = []
    if(this.state.type === 'Attending') {
      eventList = this.context.eventsAttending
    } else if(this.state.type === 'Created') {
      eventList = this.context.eventsCreated
    } 

    return (
      <>
      {eventList.map(event => 
        <li className="user-event-list-item" key={event.id}>
          <div className="user-event">
            <Link
            className="user-event-link"
            to={`/event/${event.id}`}>
              <div className="user-event-img">img</div>
              <h2>{event.name}</h2>
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
          <form className="event-searchg-form">
            <select onChange={this.handleChange}>
              <option value="Attending">Events you are attending</option>
              <option value="Created">Events you created</option>
            </select>
          </form>
        </div>
        <ul className="user-event-list">
          {this.renderList()}
        </ul>
      </div>
    ) 
  }
}

export default UsersEventList