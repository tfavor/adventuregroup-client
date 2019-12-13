import React, { Component } from 'react';
import './LoginForm.css'
import config from '../../config'
import ApiContext from '../../ApiContext'

class LogInForm extends Component {

static contextType = ApiContext;

handleSubmit= ev => {
  ev.preventDefault()
  const { userName, password } = ev.target

  const token = window.btoa(`${userName.value}:${password.value}`)
  window.localStorage.setItem(config.TOKEN_KEY, token)
  this.context.handleLogin()
}

  render() {
    return (
      <form className="login-form" onSubmit={this.handleSubmit}>
        <label>log in</label>
        <input type="text" id="userName" placeholder="username"/>
        <input type="text" id="password" placeholder="password"/>
        <button type="submit">log in</button>
      </form>
    )
  }
} 

export default LogInForm;