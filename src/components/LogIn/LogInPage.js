import React, { Component } from 'react';
import './LogInPage.css'
import config from '../../config'
import ApiContext from '../../ApiContext'
import TokenService from '../../services/token-service'
import IdleService from '../../services/idle-service'
import AuthApiService from '../../services/auth-api-service'

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

handleSubmit = ev => {

  ev.preventDefault()

  const { user_name, password } = ev.target

  AuthApiService.postLogin({
    user_name: user_name.value, 
    password: password.value
  })
    .then(res => {
      this.context.handleLogin(user_name.value)
      user_name.value = ''
      password.value = ''
      this.props.history.push('/')
    })
    .catch(res => {
      this.setState({ error: res.error })
    })
}

  render() {
    return (
      <div className="login">
        <form className="login-form" onSubmit={this.handleSubmit}>
          <legend>log in</legend>
          <div className="input-container">
            <label>user name</label>
              <input type="text" id="user_name" placeholder="username" />
            <label>password</label>
              <input type="text" id="password" placeholder="password" />
          </div>
          <button type="submit">log in</button>
        </form>
      </div>
    )
  }
} 

export default LogInPage;

