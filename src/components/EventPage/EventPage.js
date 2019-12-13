import React, { Component } from 'react';
import './EventPage.css'
import ApiContext from '../../ApiContext'
import config from '../../config'
import EventPageDetails from '../EventPageDeatils/EventPageDetails'
import DiscussionCard from '../DiscussionCard/DiscussionCard'
import DiscussionBoard from '../DiscussionBoard/DiscussionBoard';
import Attendees from '../Attendees/Attendees'
import {  Link } from 'react-router-dom'

class EventPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }
 
  static defaultProps = {
    match: {
        params: {}
    }
}

  static contextType = ApiContext;

  handleDelete = (e) => {
    const id = e
    fetch(`${config.API_ENDPOINT}/event/${id}`, {
        method: 'DELETE',
        headers: {
          'content-type': 'application/json'
        },
      })
    .then(data => {
        this.context.deleteEvent(id)
        this.props.history.push('/')
    })
    .catch(err => {
      this.setState({
        error: err.message
      });
    });
    this.props.history.push('/')
    }
  

  handleAttend = (e) => {
    const userName = this.context.user.userName
    const event = this.context.eventsAll.find(event => event.id === e)
    this.context.attendEvent(userName, event)
  }

  handleEddit = (e) => {

  }

  handleMissOut = (e) => {
    
    const userName = this.context.user.userName
    const event = this.context.eventsAll.find(event => event.id === e)
    this.context.missOut(userName, event)
  }
  
  renderButton = (event) => {
   const user= this.context.user
   if (user.id === event.creator) {
     return (
      <>
        <button type="button" className="editBotton" onClick={e => this.handleDelete(event.id)}>edit</button>
        <button type="button" className="deleteBotton" onClick={e => this.handleDelete(event.id)}>delete</button>
      </>
     )
   } else if(event.users_attending.includes(user.userName)){
    return (
      <>
       <button type="button" className="unattendButton" onClick={e => this.handleMissOut(event.id)}>miss out</button>
      </>
    )
   } else {
     return (
       <>
        <button type="button" className="attendButton" onClick={e => this.handleAttend(event.id)}>attend</button>
       </>
     )
   }
  }

  render() {
    const eventId = this.props.match.params.event_id
    const idForEvent = parseInt(eventId, 10)
    const events = this.context.eventsAll
    const event = events.find(event => event.id === idForEvent)
    return (
      <div>
        <div className="eventHeader">
          <div className="event-img-div">
              <div>
                  <div className="img">img</div>
              </div>
          </div>
          <div className="header">
            <h2>{event.name}</h2>
            <div className="buttons">
              {this.renderButton(event)}
            </div>
          </div>
        </div>
        <EventPageDetails event={event}/>
        <div className="discussion-board-link-container">
          <Link className="discussion-board-link" to={{
            pathname: `/event/${event.id}/discussion`,
            state: {
              eventId: event.id
            }
          }}>discussion board
          </Link>
        </div>
        <Attendees event={event}/>
      </div>
    )
  }
}

export default EventPage