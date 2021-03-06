import React, { Component } from 'react';
import './CreateEvent.css'
import ApiContext from '../../ApiContext'
import DateTimePicker from 'react-datetime-picker';
import { Route, Link } from 'react-router-dom'
import config from '../../config'
import EventApiService from '../../services/events-api-service'
import AttendeeService from '../../services/attendee-api-service'
import PlacesAutocomplete from 'react-places-autocomplete';


class CreateEvent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      address: ''
    }
  }

  static contextType = ApiContext;

  handleSubmit = (event) => {
    event.preventDefault()

    const target = event.target
    const newEvent = {
      id: Math.random(),
      name: target.name.value,
      location: this.state.address,
      date: target.datetime.value,
      type: target.type.value,
      details: target.description.value,
      users_attending: this.context.user,
    }

    EventApiService.PostEvent(newEvent)
    .then(eventRes => {
      const newAttendee = {
        user_name: this.context.user,
        event_id: eventRes.id,
        creator: true,
      }
      AttendeeService.PostNewAttendee(newAttendee)
      .then(attendeeRes => {
        console.log(attendeeRes)
        this.context.handleCreateEvent(eventRes, attendeeRes)
      })
      this.props.history.push(`/`)
    })
    .catch(res => {
      this.setState({ error: res.error })
    })
  }

  onChange = (e) => {
    this.setState({
      address: e
    })
  }

  handleSelect = (value) => {
    this.setState({
      address: value
    })
  }

  render() {
    return (
      <div className="createEvent">
        <form className="createEvent-Form" onSubmit={this.handleSubmit}>
          <legend>Create Event</legend>
          <label>event name</label>
            <input name="name" type="text" placeholder="event Name"></input>
          <label>event location</label>


            <PlacesAutocomplete 
              value={this.state.address} 
              onChange={this.onChange} 
              onSelect={this.handleSelect}
              >
              {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                <div className="autocomplete-div">
                  <input className="autocomplete-input" {...getInputProps({placeholder: "search"})} />

                  <div className="autocomplete-suggestions">
                    {suggestions.map((suggestion, i) => {
                      const style = {
                        backgroundColor: suggestion.active ? "#41b6e6" : "#fff"
                      }
                      return <div className="suggestion"{...getSuggestionItemProps(suggestion, {style})} key={i}>{suggestion.description}</div>
                    })}
                  </div>
                </div>
              )}
            </PlacesAutocomplete>


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
 /*<input name="location" type="text" placeholder="City, State"></input> */