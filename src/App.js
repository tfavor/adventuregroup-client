import React, { Component } from 'react';
import './App.css';
import jwtDecode from 'jwt-decode'
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
import TokenService from './services/token-service'
import IdleService from './services/idle-service'
import AuthApiService from './services/auth-api-service'
import EventApiService from './services/events-api-service'
import AttendeeService from './services/attendee-api-service'
import Attendees from './components/Attendees/Attendees';

class App extends Component {
  state = {
    user: null,
    eventsAll: [],
    eventsAttending: [],
  }

  componentDidMount() {
    this.setState({
      user: window.sessionStorage.getItem('user_name')
    })

    IdleService.setIdleCallback(this.handleLogout)
    if (TokenService.hasAuthToken()) {
      this.setState({
        loggedIn: true
      })
      /*
        tell the idle service to register event listeners
        the event listeners are fired when a user does something, e.g. move their mouse
        if the user doesn't trigger one of these event listeners,
          the idleCallback (logout) will be invoked
      */
      IdleService.regiserIdleTimerResets()

      /*
        Tell the token service to read the JWT, looking at the exp value
        and queue a timeout just before the token expires
      */
      TokenService.queueCallbackBeforeExpiry(() => {
        /* the timoue will call this callback just before the token expires */
        AuthApiService.postRefreshToken()
      })
    } else {
      this.setState({

      })
    }

    EventApiService.GetAllEvents()
      .then(res => {
        this.setState({
          eventsAll: res
        })
          this.fetchAttending()
      })
      .catch(res => {
        this.setState({ error: res.error })
      })

  }

  componentWillUnmount() {
    /*
      when the app unmounts,
      stop the event listeners that auto logout (clear the token from storage)
    */
    IdleService.unRegisterIdleResets()
    /*
      and remove the refresh endpoint request
    */
    TokenService.clearCallbackBeforeExpiry()
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

  handleLogin = (user_name) => {
    window.sessionStorage.setItem('user_name', user_name)
    this.setState({
      user: window.sessionStorage.getItem('user_name')
    })
    this.fetchAttending()
  }

  fetchAttending = () => {    
    AttendeeService.GetByUsername()
    .then(attendees => {
      this.setState({
        eventsAttending: attendees,
        loggedIn: true
      })
    })
  }

  handleLogout = () => {
    window.sessionStorage.removeItem('user_name')
    TokenService.clearAuthToken()
    TokenService.clearCallbackBeforeExpiry()
    IdleService.unRegisterIdleResets()
    this.forceUpdate()
    this.setState({
      loggedIn: false,
    })
  }

  handleSignup = () => {
    this.setState({
      loggedIn: true
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

  missOut = (id) => {
    const attendingList = this.context.eventsAttending.filter(instance => instance.id !== id)
    console.log(id)
    /*const eventsAll = this.state.eventsAll
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
    }*/
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
    console.log(this.state)
    const values = {
      user: this.state.user,
      eventsAll: this.state.eventsAll,
      eventsAttending: this.state.eventsAttending,
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
