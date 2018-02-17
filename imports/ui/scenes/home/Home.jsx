import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

export default class Home extends Component {
  constructor(props) {
    super(props);
  }

  handleTest = () => {
    Meteor.call('email.add', 'hello', (err) => {
      alert(err);
    })
  };

  handleLogin = e => {
    this.props.history.push('/login');
  };

  render() {
    return (
      <div>
        Home works!
        <button className="home-button" onClick={this.handleTest}>Click me</button>
        <button onClick={this.handleLogin}>Login</button>
      </div>
    )
  }
}