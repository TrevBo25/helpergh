import React, {Component} from 'react';
import axios from 'axios';

export default class Home extends Component {
  constructor(){
    super()
    this.state = {code: null}
    this.getAuthToken = this.getAuthToken.bind(this);
  }

  componentDidMount(){
    const authCode = this.getAuthCode(window.location.href);
    this.setState({
      code: authCode
    }, this.getAuthToken)
  }

  getAuthCode(url){
    var error = url.match(/[&\?]error=([^&]+)/);
    if (error) {
        throw 'Error getting authorization code: ' + error[1];
    }
    return url.match(/[&\?]code=([\w\/\-]+)/)[1];
  }

  getAuthToken(){
    console.log(this.state.code)
    axios.post('http://localhost:3535/api/tokengetter', {code: this.state.code})
      .then(response => {
        console.log(response.data)
        axios.get('https://api.github.com/search/user')
          .then(response => {
            console.log(response.data)
          })
          .catch(err => console.log(err))
      })
  }

  render(){
    return(
      <div>
        Here I am!
      </div>
    )
  }
}