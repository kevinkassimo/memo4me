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
              <h2>Memo 4 Me</h2>
              <p>Instantly connect with people while retaining privacy</p><a class="btn btn-primary btn-cta btn-lg btn-raised ui-wave" target="_blank" onClick={this.handleLogin}>Login</a>
            </div>
            <div class="img scrollreveal"><img src="/images/home_placeholder.png"></img></div>
          </div>
        </div>
        <div class="features" id="features">
        <header>
          <h2 class="section-heading-underline">Key Features</h2>
        </header>
        <div class="container">
          <div class="row">
            <div class="col-md-4">
              <div class="icon-box ibox-plain ibox-center no-margin-top">
                <div class="ibox-icon"><a href="javascript:;"><i class="material-icons">devices</i></a></div>
                <h3>Responsive Design</h3>
                <p>mobile-ready design adopt to any device</p>
              </div>
            </div>
            <div class="col-md-4">
              <div class="icon-box ibox-plain ibox-center no-margin-top">
                <div class="ibox-icon"><a href="javascript:;"><i class="material-icons">card_travel</i></a></div>
                <h3>Material UI Kit</h3>
                <p>material design ui kit with tons of components</p>
              </div>
            </div>
            <div class="col-md-4">
              <div class="icon-box ibox-plain ibox-center no-margin-top">
                <div class="ibox-icon"><a href="javascript:;"><i class="material-icons">desktop_mac</i></a></div>
                <h3>Web App</h3>
                <p>single page application with React</p>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-md-4">
              <div class="icon-box ibox-plain ibox-center">
                <div class="ibox-icon"><a href="javascript:;"><i class="material-icons">view_quilt</i></a></div>
                <h3>Powerful Layout</h3>
                <p> <span>multiple layouts to choose from</span><br></br><span>and build your own</span></p>
              </div>
            </div>
            <div class="col-md-4">
              <div class="icon-box ibox-plain ibox-center">
                <div class="ibox-icon"><a href="javascript:;"><i class="material-icons">palette</i></a></div>
                <h3>Multiple Themes</h3>
                <p><span>18 predefined color schemes,</span><br></br><span>light & dark themes</span></p>
              </div>
            </div>
            <div class="col-md-4">
              <div class="icon-box ibox-plain ibox-center">
                <div class="ibox-icon"><a href="javascript:;"><i class="material-icons">remove_red_eye</i></a></div>
                <h3>High Resolution</h3>
                <p>high resolution screens are<br></br><span>well supported</span></p>
              </div>
            </div>
          </div>
          
          </div>
          <div class="divider divider-xl"></div>
          <p class="text-center text-muted"><em>... and much more</em></p>
        </div>

        <div class="faq" id="faq">
        <div class="container">
          <header>
            <h2 class="section-heading-underline">Why React</h2>
          </header>
          <ul class="faq-list">
            <li class="scrollreveal">
              <h4 class="faq-q">Develop Across All Platforms</h4>
              <p class="faq-a">Learn one way to build applications with React and reuse your code and abilities to build apps for any deployment target. For web, mobile web, native mobile and native desktop. Declarative views make your code more predictable and easier to debug.</p>
            </li>
            <li class="scrollreveal">
              <h4 class="faq-q">Declarative</h4>
              <p class="faq-a">React makes it painless to create interactive UIs. Design simple views for each state in your application, and React will efficiently update and render just the right components when your data changes.<br></br><span>Declarative views make your code more predictable and easier to debug.</span></p>
            </li>
            <li class="scrollreveal">
              <h4 class="faq-q">Component-Based</h4>
              <p class="faq-a">Build encapsulated components that manage their own state, then compose them to make complex UIs.<br></br><span>Since component logic is written in JavaScript instead of templates, you can easily pass rich data through your app and keep state out of the DOM. </span></p>
            </li>
            <li class="scrollreveal">
              <h4 class="faq-q">Learn Once, Write Anywhere</h4>
              <p class="faq-a">We don't make assumptions about the rest of your technology stack, so you can develop new features in React without rewriting existing code.<br></br><span>React can also render on the server using Node and power mobile apps using React Native.</span></p>
            </li>
          </ul>
        </div>
      </div>
      <div class="action-call text-center"><span class="scrollreveal">Getting started is easy. Be up and running in minutes.</span><a class="btn btn-default btn-cta btn-lg btn-raised ui-wave scrollreveal" href="#" onClick={this.handleLogin}>Login now</a></div>
      <footer class="footer text-center"><span>© Copyright <span id="copyright"></span> Material</span></footer>
        Home works!
        <button className="home-button" onClick={this.handleTest}>Click me</button>
        {/*<button onClick={this.handleLogin}>Login</button>*/}
      </div>
    )
  }
}