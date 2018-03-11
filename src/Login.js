import React, { Component } from 'react';
import logo from './logo.svg';
import axios from 'axios';

class Login extends Component {

  login(){
    window.open('https://github.com/login/oauth/authorize?client_id=934f8365346d27323ff9')
    window.close()
  }

  render() {
    return (
      <div style={{display: 'flex', justifyContent: "center"}}>
        <div>
          <button onClick={this.login}>Click me to login</button>
        </div>
      </div>
    );
  }
}

export default Login;
