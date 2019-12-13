import React, { Component } from 'react';
import './CreateEvent.css'
import ApiContext from '../../ApiContext'
import { Route, Link } from 'react-router-dom'

class CreateEvent extends Component {

  static contextType = ApiContext;

  handleSubmit = (event) => {
    event.preventDefault()
    const target = event.target
    console.log(target.type.value)
    const newEvent = {
      id: Math.random(),
      name: target.name.value,
      location: target.location.value,
      date: target.date.value,
      type: target.type.value,
      description: target.description.value,
      creator: this.context.user.userName,
      users_attending: [],
    }
    this.context.handleCreateEvent(newEvent)
    this.props.history.push('/')
  }

  render() {
    console.log()
    return (
      <div className="createEvent">
        <form className="createEvent-Form" onSubmit={this.handleSubmit}>
          <legend>Create Event</legend>
          <label>event name</label>
            <input name="name" type="text" ></input>
          <label>event location</label>
            <input name="location" type="text"></input>
          <label>event date</label>
            <input name="date" type="date"></input>
          <label>type</label>
            <select name="type">
              <option value="hiking">Hiking</option>
              <option value="biking">Biking</option>
              <option value="climbing">Climbing</option>
              <option value="camping">Camping</option>
              <option value="water">Water</option>
              <option value="other">Other</option>
            </select>
          <label>description</label>
            <textarea name="description"/>
          <button type="submit">create</button>
        </form>
      </div>
    )
  }
}

export default CreateEvent