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
          <label>Sign up</label>
          <input type="text" id="userName" placeholder="username"/>
          <input type="text" id="password" placeholder="password"/>
          <input type="text" id="reenterPassword" placeholder="reenter password"/>
          <button type="submit">Sign Up</button>
        </form>
      </div>
    )
  }
} 

export default SignUp