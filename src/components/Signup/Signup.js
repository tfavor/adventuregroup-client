import React, { Component } from 'react';
import './Signup.css'
import config from '../../config'
import ApiContext from '../../ApiContext'
import AuthApiService from '../../services/auth-api-service'
import TokenService from '../../services/token-service'

class SignUp extends Component {
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
  const full_name = ev.target.full_name.value
  const user_name = ev.target.user_name.value
  const password = ev.target.password.value
  fetch(`${config.API_ENDPOINT}/api/users`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify({ full_name, user_name, password }),
  })
  .then((res) => {
    
      if (!res.ok)
      throw new Error(res.status)

      return res.json()
  })
  .then((res) => {
    
    AuthApiService.postLogin({
      user_name: user_name, 
      password: password
    })
    .then(res => {
      this.context.handleLogin(user_name)
    })
  })
  .then(res => {
    this.props.history.push('/')
  })
  .catch(res => {
    this.setState({ error: res.error })
  })
  .catch(error => {
  });
}

  render() {
    return (
      <div className="signup">
        <form className="signup-form" onSubmit={this.handleSubmit}>
          <legend>Sign up</legend>
          <div className="input-container">
            <label>full name</label>
                  <input type="text" id="full_name" placeholder="full name" />
            <label>user name</label>
              <input type="text" id="user_name" placeholder="username"/>
            <label>password</label>
              <input type="text" id="password" placeholder="password"/>
              <p className="password-requirments">*Pasword must be between 8 and 72 charictors<br/>
                  *Password can NOT start or end with a space<br/>
                  *Password must contain one upper case, lower case, number and special character
              </p>
            <label>re-enter password</label>
              <input type="text" id="reenterPassword" placeholder="re-enter password"/>
          </div>
          <button type="submit">Sign Up</button>
        </form>
      </div>
    )
  }
} 

export default SignUp

/*  ev.preventDefault()
  const { userName, password } = ev.target

  const token = window.btoa(`${userName.value}:${password.value}`)
  window.localStorage.setItem(config.TOKEN_KEY, token)
  this.context.handleLogin()
  this.props.history.goBack() */