import React, { Component } from 'react';
import './App.css';
import { Route, Link } from 'react-router-dom'
import Nav from './components/Nav/Nav'
import Head from './components/Head/Head'
import ApiContext from './ApiContext'
import STORE from './STORE'



class App extends Component {
  state = {
    user: '',
    eventsAll: [],
    eventsAttending: [],
    eventsCreated: [],
  }

  componentDidMount() {
    const user = STORE.users[0]
    const eventsAll = STORE.eventsAll
    const eventsAttending = this.state.eventsAll.filter(event => event.users_attending.includes(this.state.user.userName))
    const eventsCreated = this.state.eventsAll.filter(event => event.creator === this.state.user.id)
    this.setState({
      user: user,
      eventsAll: eventsAll,
      eventsAttending: eventsAttending,
      eventsCreated: eventsCreated
    })
  }

  render() {
    const values = {
      user: this.state.user,
      eventsAll: this.state.eventsAll,
      eventsAttending: this.state.eventsAttending,
      eventsCreated: this.state.eventsCreated
    }
    console.log(this.state)
    return (
      <ApiContext.Provider value={values}>
        <div className="App">
          <header>
            <Nav />
          </header>
          <main>
            <Head/>
          </main>
        </div>
      </ApiContext.Provider>
    )
  }
}

export default App;
