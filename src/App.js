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
    eventsAttending: [],
    eventsCreated: [],
    hikingEvents: [],
    bikingEvents: [],
    climbingEvents: [],
    campingEvents: [],
    waterEvents: [],
    otherEvents: [],
    discussionCards: [],
    discussionCardComments: [],
  }

  componentDidMount() {
  this.updateState()
    if(window.localStorage.getItem(config.TOKEN_KEY) === null) {
      this.setState({
        loggedIn: false
      })
    } else {
      this.setState({
        loggedIn: true
      })
    }
  }

  updateState = () => {
    const user = STORE.users[1]
    const eventsAll = STORE.eventsAll
    const eventsAttending = eventsAll.filter(event => event.users_attending.includes(user.userName))
    const eventsCreated = eventsAll.filter(event => event.creator === user.id)
    const hikingEvents = eventsAll.filter(event => event.type === 'hiking')
    const bikingEvents = eventsAll.filter(event => event.type === 'biking')
    const climbingEvents = eventsAll.filter(event => event.type === 'climbing')
    const campingEvents = eventsAll.filter(event => event.type === 'camping')
    const waterEvents = eventsAll.filter(event => event.type === 'water')
    const otherEvents = eventsAll.filter(event => event.type === 'other')
    const discussionCards = STORE.discussionCards
    const discussionCardComments = STORE.discussionCardComments
    this.setState({
      user: user,
      eventsAll: eventsAll,
      eventsAttending: eventsAttending,
      eventsCreated: eventsCreated,
      hikingEvents: hikingEvents,
      bikingEvents: bikingEvents,
      climbingEvents: climbingEvents,
      campingEvents: campingEvents,
      waterEvents: waterEvents,
      otherEvents: otherEvents,
      discussionCards: discussionCards,
      discussionCardComments: discussionCardComments,
      loggedIn: false
    })
  }

  renderMainRoutes() {
    return (
      <>
        <Route exact path='/' component={Home}/>
        <Route exact path='/event/:event_id' component={EventPage}/>
        <Route path='/create_event' component={CreateEvent}/>
        <Route path="/signup" component={SignUp}/>
        <Route path="/login" component={LogInPage}/>
        <Route path="/event/:event_id/discussion" render={(props) => <DiscussionBoard cards={this.state.discussionCards} eventId={props.match.params.event_id}/>}/>
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
   this.updateState()
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
      eventsAttending: this.state.eventsAttending,
      eventsCreated: this.state.eventsCreated,
      hikingEvents: this.state.hikingEvents,
      bikingEvents: this.state.bikingEvents,
      climbingEvents: this.state.climbingEvents,
      campingEvents: this.state.campingEvents,
      waterEvents: this.state.waterEvents,
      otherEvents: this.state.otherEvents,
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
