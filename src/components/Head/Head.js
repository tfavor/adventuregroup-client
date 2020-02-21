import config from "../../config"
import React, { Component } from 'react';
import './Head.css';
import {  Link } from 'react-router-dom'
import ApiContext from '../../ApiContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faPlus, faCaretDown } from '@fortawesome/free-solid-svg-icons'
import PlacesAutocomplete from 'react-places-autocomplete';
import About from '../About/About'
import img from '../../images/header.jpg'


class Head extends Component {
  constructor(props) {
    super(props)
    this.state = {
      active: false,
      address: '',
    }
  }

  static contextType = ApiContext;

  handleSubmit = (e) => {
    e.preventDefault()
    const location = this.state.address
   
      
  }

  toggleFilter = () => {
    const currentState = this.state.active
    this.setState({
      active: !currentState,
    })
    console.log(this.state)
  }

  handleFilter = (e) => {
    e.preventDefault()
    const type = e.target.value
    this.setState({
      active: false
    })
    this.context.handleFilter(type)
  }

  onChange = (e) => {
    this.setState({
      address: e
    })
  }

  handleSelect = (value) => {
    console.log(value)
    this.setState({
      address: value
    })
  }

  renderList = () => {
    const options = ["hiking", "biking", "climbing", "camping", "water", "other"]

    for(let i = 0; i < options.length; i++) {
      return (
        <li key={i}>
          <button type="button" value={options[i]}>{options[i]} events</button>
        </li>
      )
    }
  }

  render() {
    const searchOptions = {
      types: ['(cities)'],
    }
    const options = ["all" ,"hiking", "biking", "climbing", "camping", "water", "other"]
    const currentState = this.state.active
    return (
      <section className="head">
          <h1 className="header">Welcome to AdventureGroup</h1>
          <p className="quote">Find your friends and your adventure</p>
          <div className="filter-search">
            <div className="filter-container">
              <button className="filter" onClick={this.toggleFilter}>filter <FontAwesomeIcon icon={faCaretDown} /></button>
              <div style={{ display: this.state.active != false ? 'block' : 'none' }}className="eventOptions">
                <ul>
                  {options.map((option, i) => {
                    return <li key={i}>
                      <button type="button" onClick={e => this.handleFilter(e)} value={options[i]}>{options[i]} events</button>
                      </li>
                  })}
                </ul>
              </div>
            </div>
            <form className="event-searchg-form" onSubmit={this.handleSubmit}>
              
              <PlacesAutocomplete 
                value={this.state.address} 
                onChange={this.onChange} 
                onSelect={this.handleSelect}
                searchOptions={searchOptions}
                >
                {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                  <div className="autocomplete-div">
                    <input className="autocomplete-input" {...getInputProps({placeholder: "search"})} />

                    <div className="autocomplete-suggestions">
                      {loading? <div className="loading">...loading</div> : null}
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

              <button type="submit"><FontAwesomeIcon icon={faSearch} /></button>
            </form>
          </div>
          <Link 
              className="create-event-link" 
              to="/create_event" 
              style={{ textDecoration: 'none' }}><FontAwesomeIcon id="plus" icon={faPlus} />  create an event</Link>
        
      </section>
    )
  }
}

export default Head
/*<input type="text" id="search-form" name="location" placeholder="city, state" onChange={e => this.activatePlaces(e)}/>
{loading? <div className="loading">...loading</div> : null}*/