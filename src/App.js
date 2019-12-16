import React, { Component } from 'react';
import './App.css';
import { Route, Link } from 'react-router-dom'
import config from './config'
import Nav from './components/Nav/Nav'
import Head from './components/Head/Head'
import Home from './components/Home/Home'
import CreateEvent from './components/CreateEvent/CreateEvent'
import EventPage from './components/EventPage/EventPage'
import SignUp from './components/Signup/Signup'
import LogInPage from './components/LogIn/LogInPage'
import DiscussionBoard from './components/DiscussionBoard/DiscussionBoard'
import ApiContext from './ApiContext'
import STORE from './STORE'

class App extends Component {
  state = {
    user: '',
    eventsAll: [],
    discussionCards: [],
    discussionCardComments: [],
  }

  componentDidMount() {
    const user = STORE.users[1]
    const eventsAll = STORE.eventsAll
    const discussionCards = STORE.discussionCards
    const discussionCardComments = STORE.discussionCardComments
    this.setState({
      eventsAll: eventsAll,
      discussionCards: discussionCards,
      discussionCardComments: discussionCardComments,
      loggedIn: false
    })
    if(window.localStorage.getItem(config.TOKEN_KEY) === null) {
      this.setState({
        user: '',
        loggedIn: false
      })
    } else {
      this.setState({
        user: user,
        loggedIn: true
      })
    }
  }

  renderMainRoutes() {
    return (
      <>
        <Route exact path='/' component={Home}/>
        <Route exact path='/event/:event_id' component={EventPage}/>
        <Route path='/create_event' component={CreateEvent}/>
        <Route path="/signup" component={SignUp}/>
        <Route path="/login" component={LogInPage}/>
      </>
    )
  }

  handleLogin = () => {
    this.setState({
      loggedIn: true
    })
  }

  handleLogout = () => {
    this.setState({
      loggedIn: false
    })
  }

  handleCreateEvent = (newEvent) => {
    const eventList = this.state.eventsAll
    eventList.push(newEvent)
    this.setState({
      eventsAll: eventList
    })
  }

  deleteEvent = (id) => {
    const eventsAll = [...this.state.eventsAll]
    const eventToDelete = this.state.eventsCreated.find(event => event.id === id)
    const index = this.state.eventsAll.indexOf(eventToDelete)
    if(index !== -1) {
      eventsAll.splice(index, 1)
      this.setState({
        eventsAll: eventsAll
      })
    }
  }

  attendEvent = (user, event) => {
    const eventsAll = this.state.eventsAll
    const eventIndex = eventsAll.indexOf(event)
    let userList = [...event.users_attending]
    userList.push(user)
    event.users_attending = userList
    eventsAll.splice(eventIndex, 1, event)
      this.setState({
        eventsAll: eventsAll
      })
  }

  missOut = (userName, event) => {
    const eventsAll = this.state.eventsAll
    const eventIndex = eventsAll.indexOf(event)
    let userList = [...event.users_attending]
    const userToRemove = event.users_attending.find(user => user === userName)
    const userIndex = event.users_attending.indexOf(userToRemove)
    if(userIndex !== -1) {
      userList.splice(userIndex, 1)
      event.users_attending = userList
      eventsAll.splice(eventIndex, 1, event)
      this.setState({
        eventsAll: eventsAll
      })
    }
  }

  createCard = (card) => {
    const cardList = [...this.state.discussionCards]
    cardList.push(card)
    this.setState({
      discussionCards: cardList
    })
  }

  deleteCard = (id) => {
    const cardList = [...this.state.discussionCards]
    const cardToDelete = cardList.find(card => card.id === id)
    const index = cardList.indexOf(cardToDelete)
    if(index !== -1) {
      cardList.splice(index, 1)
      this.setState({
        discussionCards: cardList
      })
    }
  }

  render() {
    const values = {
      user: this.state.user,
      eventsAll: this.state.eventsAll,
      discussionCards: this.state.discussionCards,
      discussionCardComments: this.state.discussionCardComments,
      loggedIn: this.state.loggedIn,
      handleLogin: this.handleLogin,
      handleLogout: this.handleLogout,
      handleCreateEvent: this.handleCreateEvent,
      deleteEvent: this.deleteEvent,
      attendEvent: this.attendEvent,
      missOut: this.missOut,
      createCard: this.createCard,
      deleteCard: this.deleteCard,
    }
    return (
      <ApiContext.Provider value={values}>
        <div className="App">
          <header>
            <Nav />
          </header>
          <main>
            {this.renderMainRoutes()}
          </main>
        </div>
      </ApiContext.Provider>
    )
  }
}

export default App;
