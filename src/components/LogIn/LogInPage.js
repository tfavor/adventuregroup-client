import React, { Component } from 'react';
import './LogInPage.css'
import config from '../../config'
import ApiContext from '../../ApiContext'

class LogInPage extends Component {
  static defaultProps = {
    match: {
      params: {}
    },
    history: {
        goBack: () => {}
    }
  }


static contextType = ApiContext;

handleSubmit= ev => {
  ev.preventDefault()
  const { userName, password } = ev.target

  const token = window.btoa(`${userName.value}:${password.value}`)
  window.localStorage.setItem(config.TOKEN_KEY, token)
  this.context.handleLogin()
  this.props.history.goBack()
}

  render() {
    return (
      <div className="login">
        <form className="login-form" onSubmit={this.handleSubmit}>
          <label>log in</label>
          <input type="text" id="userName" placeholder="username"/>
          <input type="text" id="password" placeholder="password"/>
          <button type="submit">log in</button>
        </form>
      </div>
    )
  }
} 

export default LogInPage;