import React, { Component } from 'react';
import './CreateEvent.css'
import ApiContext from '../../ApiContext'
import { Route, Link } from 'react-router-dom'

class CreateEvent extends Component {

  static contextType = ApiContext;

  handleSubmit = (event) => {
    event.preventDefault()
    const target = event.target

    const dateTimeInout = target.datetime.value
    const time = new Date(dateTimeInout).toLocaleTimeString().replace(/([\d]+:[\d]{2})(:[\d]{2})(.*)/, "$1$3")
    const foo = new Date(dateTimeInout)
    const year = foo.getFullYear()
    const month = foo.getMonth() + 1
    const day = foo.getDate()
    const dateTime = month + "-" + day + "-" + year + ", " + time
    const newEvent = {
      id: Math.random(),
      name: target.name.value,
      location: target.location.value,
      date: dateTime,
      type: target.type.value,
      description: target.description.value,
      creator: this.context.user.userName,
      users_attending: [],
    }
    this.context.handleCreateEvent(newEvent)
    this.props.history.push('/')
  }

  render() {
    return (
      <div className="createEvent">
        <form className="createEvent-Form" onSubmit={this.handleSubmit}>
          <legend>Create Event</legend>
          <label>event name</label>
            <input name="name" type="text" placeholder="event Name"></input>
          <label>event location</label>
            <input name="location" type="text" placeholder="City, State"></input>
          <label>date-time</label>
            <input name="datetime" type="datetime-local"></input>
          <label>type</label>
            <select name="type">
              <option value="hiking">Hiking</option>
              <option value="biking">Biking</option>
              <option value="climbing">Climbing</option>
              <option value="camping">Camping</option>
              <option value="water">Water</option>
              <option value="other">Other</option>
            </select>
          <label className="description">description</label>
            <textarea name="description" placeholder="event details"/>
          <button type="submit">create</button>
        </form>
      </div>
    )
  }
}

export default CreateEvent