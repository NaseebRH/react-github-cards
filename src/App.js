import React, { Component } from 'react';
import './App.css';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      keyword: ''
    }
  }



  submitData = event => {
    event.preventDefault();
    //console.log(event.target);
    this.getUser(this.state.keyword);
  }

  async getUser(username) {
    let url = `https://api.github.com/users/${username}?client_id=97f820caea34ff9c4f8f&client_secret=961800307c9f448eeb83aecd5060921f09af8c21`
    let raw = await fetch(url);
    let userData = await raw.json();
    console.log(userData)
    this.setState({
      users: [...this.state.users, userData]

    })
    console.log(this.state.users)
  }

  handleChange = event => {
    this.setState({
      keyword: event.target.value
    })
    //console.log(this.state.keyword);

  }
  deleteDiv = (e) => {

    this.setState({
      users: this.state.users.filter(a => a !== e)
    });

  }

  style = {
    width: "18rem",
  }
  render() {

    return (


      <div className="App">
        <form onSubmit={event => this.submitData(event)}>
          <input type="text" placeholder="write the user name" onChange={this.handleChange} />
          <input type="submit" />
        </form>
      
          <div className="row">
            <div className="col-sm-4">
              {this.state.users.map(user => (
                <div className="card m-2" style={this.style} key={user.id}>
                  <img className="card-img-top" src={user.avatar_url} alt="Card image cap" />
                  <div className="card-body">
                    <h5 className="card-title"> Name : {user.login}</h5>
                  </div>
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item">Followers : {user.followers}</li>
                    <li className="list-group-item">Following : {user.following}</li>
                  </ul>

                  <button onClick={() => this.deleteDiv(user)} className="btn btn-danger">Delete</button>

                </div>
              ))}
            </div>
          </div>
      
      </div>);
  }
}

export default App;
