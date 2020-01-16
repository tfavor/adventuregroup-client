import React, { Component } from 'react';
import './EventPage.css'
import ApiContext from '../../ApiContext'
import config from '../../config'
import EventPageDetails from '../EventPageDeatils/EventPageDetails'
import DiscussionCard from '../DiscussionCard/DiscussionCard'
import DiscussionBoard from '../DiscussionBoard/DiscussionBoard';
import Attendees from '../Attendees/Attendees'
import img from '../../images/default-event-img.jpg'
import {  Link } from 'react-router-dom'
import TokenService from '../../services/token-service'
import EventApiService from '../../services/events-api-service'
import AttendeeService from '../../services/attendee-api-service'

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
    const eventId = e
    const eventsCreated = this.context.eventsCreated
    const thisEvent = eventsCreated.find(instance => instance.event_id === e)
    EventApiService.DeleteEvent(eventId)
    .then(res => {
      this.props.history.push('/')
      this.context.deleteEvent(eventId, thisEvent.id)
      console.log('here')
    })
    .catch(err => {
      console.log(err)
    });

    }

  handleAttend = (e) => {
    console.log(e)
    const newAttendee = {
      id: Math.random(),
      event_id: e,
      user_name: this.context.user,
      creator: false
    }

    AttendeeService.PostNewAttendee(newAttendee)
    .then(res => {
      this.context.attendEvent(res)
      this.props.history.push('/')
    })
    .catch(err => {
      this.setState({
          error: err.message
      });
    });
  }

  handleEddit = (e) => {

  }

  handleMissOut = (e) => {
    const eventsAttending = this.context.eventsAttending
    const thisEvent = eventsAttending.find(instance => instance.event_id === e)
    AttendeeService.DeleteAttendee(thisEvent.id)
    .then(res => {
      console.log(this.context.eventsCreated)
      this.context.missOut(thisEvent.id)
      this.props.history.push('/')
    })
    .catch(err => {
      console.log(err)
      this.setState({
        error: err.message
      });
    });
  }
  
  renderButton = (event) => {
    const eventsAttending = this.context.eventsAttending
    const eventsCreated = this.context.eventsCreated
   const thisEvent = eventsAttending.find(instance => instance.event_id === event.id && instance.user_name === this.context.user) 
    || eventsCreated.find(instance => instance.event_id === event.id && instance.user_name === this.context.user)

   if(thisEvent !== undefined && thisEvent.creator === true) {
     return (
      <>
        <button type="button" className="editBotton" onClick={e => this.handleDelete(event.id)}>edit</button>
        <button type="button" className="deleteBotton" onClick={e => this.handleDelete(event.id)}>delete</button>
      </>
     )
   } else if(thisEvent !== undefined){
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
          <div className="event-page-img-div">
            <img className="event-page-img" src={img}></img>
          </div>
          <div className="header">
            <h2>{event.name}</h2>
            <div className="buttons">
              {this.renderButton(event)}
            </div>
          </div>
        </div>
        <div className="gap"></div>
        <EventPageDetails event={event}/>
        <Attendees event={event}/>
      </div>
    )
  }
}

export default EventPage