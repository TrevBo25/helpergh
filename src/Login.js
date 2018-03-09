import React, { Component } from 'react';
import logo from './logo.svg';
import axios from 'axios';

class Login extends Component {

  login(){
    window.open('https://github.com/login/oauth/authorize?client_id=934f8365346d27323ff9')
  }

  render() {
    return (
      <div>
        <button onClick={this.login}>Click me</button>
      </div>
    );
  }
}

export default Login;