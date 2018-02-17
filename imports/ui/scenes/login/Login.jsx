import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isSignup: false,
    };
  }

  handleLoginSubmit = e => {
    e.preventDefault();

    Meteor.loginWithPassword(this.emailElement.value, this.passwordElement.value, (err) => {
      if (err) {
        alert(err);
        return; // failed
      }
      this.props.history.push('/');
    });
  };

  handleSignupSubmit = e => {
    e.preventDefault();

    Meteor.call('account.create', this.newUsernameElement.value,
      this.newEmailElement.value,
      this.newPasswordElement.value,
      this.newRealNameElement.value,
      this.newURLElement.value, (err) => {
        if (err) {
          alert(err);
        } else {
          alert('Sign up successful!');
          this.props.history.push('/dashboard');
        }
      });
  };

  setSignup = () => {
    this.setState({
      isSignup: true,
    });
  };

  setLogin = () => {
    this.setState({
      isSignup: false,
    });
  };

  render() {
    const {
      isSignup,
    } = this.state;

    return (
      <div>
        {isSignup ?
          (<div>Sign Up</div>) :
          (<div>Login</div>)
        }

        {!isSignup &&
          <form onSubmit={this.handleLoginSubmit}>
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
        }

        {isSignup &&
          <form onSubmit={this.handleSignupSubmit}>
            <div>
              <label htmlFor="username">Username: </label>
              <input name="username" type="text" ref={el => this.newUsernameElement = el}/>
            </div>
            <div>
              <label htmlFor="email">Email: </label>
              <input name="email" type="email" ref={el => this.newEmailElement = el}/>
            </div>
            <div>
              <label htmlFor="password">Password: </label>
              <input name="password" type="password" ref={el => this.newPasswordElement = el}/>
            </div>
            <div>
              <label htmlFor="realName">Actual name: </label>
              <input name="realName" type="text" ref={el => this.newRealNameElement = el}/>
            </div>
            <div>
              <label htmlFor="customUrl">Custom URL: </label>
              <input name="customUrl" type="text" ref={el => this.newURLElement = el}/>
            </div>
            <button type="submit">Submit!</button>
          </form>
        }

        <div>
          {isSignup &&
            <div>
              <p>Already have an account?</p>
              <button onClick={this.setLogin}>LOGIN!</button>
            </div>
          }
          {!isSignup &&
            <div>
              <p>Not yet registered?</p>
              <button onClick={this.setSignup}>SIGN UP!</button>
            </div>
          }
        </div>
      </div>
    )
  }
}