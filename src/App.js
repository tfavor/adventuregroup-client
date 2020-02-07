import React, { Component } from 'react';
import './App.css';
import jwtDecode from 'jwt-decode'
import { Route, Link } from 'react-router-dom'
import PrivateRoute from './components/PrivateRoute'
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
    eventsCreated: [],
    loggedIn: false,
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
        if(this.state.user !== null) {
          this.fetchAttending()
        }
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

  handleLogin = (user_name) => {
    window.sessionStorage.setItem('user_name', user_name)
    this.setState({
      user: window.sessionStorage.getItem('user_name'),
      loggedIn: true,
    })
    this.fetchAttending()
  }

  fetchAttending = () => {    
    AttendeeService.GetByUsername()
    .then(attendees => {
      this.setState({
        eventsAttending: attendees.filter(event => event.creator == false),
        eventsCreated: attendees.filter(event => event.creator == true),
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

  handleCreateEvent = (newEvent, newAttendee) => {
    
    const eventList = [...this.state.eventsAll]
    eventList.push(newEvent)
    this.setState({
      eventsAll: eventList
    })

    const createdList = [...this.state.eventsCreated]
    createdList.push(newAttendee)
    this.setState({
      eventsCreated: createdList
    })
  }

  deleteEvent = (id, attendee) => {
    console.log('here')
    const eventsAll = [...this.state.eventsAll]
    const eventList = eventsAll.filter(event => event.id !== id)

    const eventsCreated = [...this.state.eventsCreated]
    const createdList = eventsCreated.filter(event => event.id !== attendee)

    this.setState({
      eventsAll: eventList,
      eventsCreated: createdList
    })
    /*const eventsAll = [...this.state.eventsAll]
    const eventToDelete = this.state.eventsAll.find(event => event.id === id)
    const index = this.state.eventsAll.indexOf(eventToDelete)
    if(index !== -1) {
      eventsAll.splice(index, 1)
      this.setState({
        eventsAll: eventsAll
      })
    }*/
  }

  attendEvent = (newaAttendee) => {
    const attendingList = [...this.state.eventsAttending]
    attendingList.push(newaAttendee)
    this.setState({
      eventsAttending: attendingList
    })
  }

  missOut = (id) => {
    const attendingList = this.state.eventsAttending.filter(instance => instance.id !== id)
    this.setState({
      eventsAttending: attendingList
    })
  }

  renderMainRoutes() {
    return (
      <>
        <Route exact path='/' component={Home}/>
        <PrivateRoute exact path='/event/:event_id' component={EventPage}/>
        <PrivateRoute path='/create_event' component={CreateEvent}/>
        <Route path="/signup" component={SignUp}/>
        <Route path="/login" component={LogInPage}/>
      </>
    )
  }

  render() {
    console.log(this.state)
    const values = {
      user: this.state.user,
      eventsAll: this.state.eventsAll,
      eventsAttending: this.state.eventsAttending,
      eventsCreated: this.state.eventsCreated,
      loggedIn: this.state.loggedIn,
      handleLogin: this.handleLogin,
      handleLogout: this.handleLogout,
      handleCreateEvent: this.handleCreateEvent,
      deleteEvent: this.deleteEvent,
      attendEvent: this.attendEvent,
      missOut: this.missOut,
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
