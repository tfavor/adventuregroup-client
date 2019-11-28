import React, { Component } from 'react';
import './App.css';
import { Route, Link } from 'react-router-dom'
import { directive } from '@babel/types';
import Nav from './components/Nav/Nav'
import Head from './components/Head/Head'



class App extends Component {
  state = {
    
  }

  render() {
    return (
      <div className="App">
        <header>
          <Nav />
        </header>
        <main>
          <Head/>
        </main>
      </div>
    )
  }
}

export default App;
