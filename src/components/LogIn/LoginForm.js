import React, { Component } from 'react';
import './LoginForm.css'

class LogInForm extends Component {
  render() {
    return (
      <form className="login-form">
        <label>log in</label>
        <input type="text" placeholder="username"/>
        <input type="text" placeholder="password"/>
        <button type="submit">log in</button>
      </form>
    )
  }
} 

export default LogInForm;