import React, {Component} from 'react';
import axios from 'axios';

export default class Home extends Component {
  constructor(){
    super()
    this.state = {
      code: null,
      token: null,
      user: null,
      repos: [],
      selectedRepo: null,
    }

    this.getAuthToken = this.getAuthToken.bind(this);
    this.getRepos = this.getRepos.bind(this);
    this.getContributors = this.getContributors.bind(this);
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
    axios.post('/api/tokengetter', {code: this.state.code})
      .then(response => {
        console.log(response.data)
        this.setUser(response.data)
      })
  }

  setUser(token){
    axios.get(`https://api.github.com/user?access_token=${token}`)
      .then(response => {
        console.log(response.data)
        this.setState({
          user: response.data,
          token: token
        }, this.getRepos)
      }).catch(err=>console.log(err))
  }

  getRepos(){
    axios.get(`https://api.github.com/user/repos?access_token=${this.state.token}`)
      .then( response => {
        console.log(response.data)
        this.setState({
          repos: response.data
        })
      })
  }

  getContributors(owner, repo, description, language, stars){
    console.log(owner, repo)
    axios.get(`https://api.github.com/repos/${owner}/${repo}/contributors?access_token=${this.state.token}`)
      .then(response => {
        console.log(response.data)
        var repoBuild = {
          repo: repo,
          contributors: response.data,
          description: description,
          language: language,
          stars: stars
        }
        console.log(repoBuild)
        this.setState({
          selectedRepo: repoBuild
        })
      })
  }

  render(){
    console.log(this.state)
    let repos = this.state.repos.map((e, i, a) => {
      return (
        <li key={e.id} onClick={()=> this.getContributors(e.owner.login, e.name, e.description, e.language, e.stargazers_count)}> 
          {e.name} 
        </li>
      )
    })

    return(
      <div style={{display: 'flex', justifyContent: "space-between", padding: "30px"}}>
        <div>
          <p>Here are your repos{this.state.user ? ` ${this.state.user.login}` : null}!</p>
          <p>Click on one to see some more information about it!</p>
          <ul>
            {repos}
          </ul>
        </div>
        <div>
          {this.state.selectedRepo ? (
          <div>
            Here is who contributed to {this.state.selectedRepo.repo}!
            <ul>
              {this.state.selectedRepo.contributors.map( e =>  <li> {e.login}</li>)}
            </ul>
            Here is what {this.state.selectedRepo.repo} is all about!
            <ul>
              <li> Description: {this.state.selectedRepo.description ? this.state.selectedRepo.description : "No description provided"}</li>
              <li> Language: {this.state.selectedRepo.language ? this.state.selectedRepo.language : "No language provided"}</li>
              <li> Stars: {this.state.selectedRepo.stars ? this.state.selectedRepo.stars : "0"}</li>
            </ul>
          </div>) : null }
        </div>
      </div>
    )
  }
}