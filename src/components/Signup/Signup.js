import React, { Component } from 'react';
import './Signup.css'
import config from '../../config'
import ApiContext from '../../ApiContext'

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
  const { userName, password } = ev.target

  const token = window.btoa(`${userName.value}:${password.value}`)
  window.localStorage.setItem(config.TOKEN_KEY, token)
  this.context.handleLogin()
  this.props.history.goBack()
}

  render() {
    return (
      <div className="signup">
        <form className="signup-form" onSubmit={this.handleSubmit}>
          <legend>Sign up</legend>
          <div className="input-container">
            <label>user name</label>
              <input type="text" id="userName" placeholder="username"/>
            <label>password</label>
              <input type="text" id="password" placeholder="password"/>
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