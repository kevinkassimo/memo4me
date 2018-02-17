import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

export default class Login extends Component {
  constructor(props) {
    super(props);
  }

  handleSubmit = e => {
    e.preventDefault();

    Meteor.loginWithPassword(this.emailElement.value, this.passwordElement.value, (err) => {
      if (err) {
        alert(err);
        return; // failed
      }
      this.props.history.push('/');
    });
  };

  render() {
    return (
      <div>
        Login works!
        <form onSubmit={this.handleSubmit}>
          <div>
            <label htmlFor="email">Email: </label>
            <input name="email" type="email" ref={el => this.emailElement = el}/>
          </div>
          <div>
            <label htmlFor="password">Password: </label>
            <input name="password" type="password" ref={el => this.passwordElement = el}/>
          </div>
          <button type="submit">Submit!</button>
        </form>
      </div>
    )
  }
}