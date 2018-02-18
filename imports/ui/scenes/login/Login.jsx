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

    var cardStyle = {
      margin: 'auto',
      marginTop: '20%',
      alignItems: 'center'
    }

    var titleStyle = {
      marginTop: '10%'
    }

    var buttonStyle = {
      margin: 'auto !important'
    }

    var formStyle = {
      padding: '10px'
    }

    return (
      <div className="mdl-grid">
        <div className="mdl-card mdl-shadow--8dp" style={cardStyle}>
          {isSignup ?
            (<div className="login-title" style={titleStyle}>Sign Up</div>) :
            (<div className="login-title" style={titleStyle}>Login</div>)
          }

          {!isSignup &&
            <form onSubmit={this.handleLoginSubmit} style={formStyle}>
              <div className="login-pe">
                <label className="login-text" htmlFor="email">Email: &nbsp; &nbsp;</label>
                <input className="mdl-textfield__input" name="email" type="email" ref={el => this.emailElement = el}/>
                
              </div>
              <div className="login-pe">
                <label className="login-text" htmlFor="password">Password: &nbsp; &nbsp; </label>
                <input className="mdl-textfield__input" name="password" type="password" ref={el => this.passwordElement = el}/>
                
              </div>
                <button className="mdl-button mdl-js-button mdl-button--raised mdl-color--cyan-400" style={buttonStyle} type="submit">Submit</button>
            </form>
          }

          {isSignup &&
            <form onSubmit={this.handleSignupSubmit}>
              <div className="login-pe">
                <label className="login-text" htmlFor="username">Username: </label>
                <input className="mdl-textfield__input" name="username" type="text" ref={el => this.newUsernameElement = el}/>
              </div>
              <div className="login-pe">
                <label className="login-text" htmlFor="email">Email: </label>
                <input className="mdl-textfield__input" name="email" type="email" ref={el => this.newEmailElement = el}/>
              </div>
              <div className="login-pe">
                <label className="login-text" htmlFor="password">Password: </label>
                <input className="mdl-textfield__input" name="password" type="password" ref={el => this.newPasswordElement = el}/>
              </div>
              <div className="login-pe">
                <label className="login-text" htmlFor="realName">Actual name: </label>
                <input className="mdl-textfield__input" name="realName" type="text" ref={el => this.newRealNameElement = el}/>
              </div>
              <div className="login-pe">
                <label className="login-text" htmlFor="customUrl">Custom URL: </label>
                <input className="mdl-textfield__input" name="customUrl" type="text" ref={el => this.newURLElement = el}/>
              </div>
              <button className="login-submit" type="submit" style={buttonStyle}>Submit</button>
            </form>
          }

          <div>
            {isSignup &&
              <div>
                <button className="login-button1" onClick={this.setLogin} style={buttonStyle}>Login</button>
              </div>
            }
            {!isSignup &&
              <div>
                <button className="login-button2" onClick={this.setSignup} style={buttonStyle}>Sign up</button>
              </div>
            }
          </div>
        </div>
      </div>

    )
  }
}