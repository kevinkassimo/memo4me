import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      shouldShowSpinner: true,
    };
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        shouldShowSpinner: false,
      });
    }, 2000);
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
    const {
      shouldShowSpinner
    } = this.state;

    return (
      <div>
        {shouldShowSpinner &&
          <div id="loader-container">
            <svg className="spinner" width="65px" height="65px" viewBox="0 0 66 66" xmlns="http://www.w3.org/2000/svg">
              <circle className="path" fill="none" stroke-width="6" stroke-linecap="round" cx="33" cy="33" r="30"></circle>
            </svg>
          </div>
        }
        <div class="main-content">
          <div class="hero" id="hero">
            <div class="container">
              <h2>Memo4Me</h2>
              <p>Instantly connect with people while retaining privacy</p><a class="btn btn-primary btn-cta btn-lg btn-raised ui-wave" target="_blank" onClick={this.handleLogin}>Login</a>
            </div>
            <div class="img scrollreveal"><img src="images/preview-1100_569.png"></img></div>
          </div>
        </div>
        Home works!
        <button className="home-button" onClick={this.handleTest}>Click me</button>
        {/*<button onClick={this.handleLogin}>Login</button>*/}
      </div>
    )
  }
}