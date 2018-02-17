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
              <circle className="path" fill="none" strokeWidth="6" strokeLinecap="round" cx="33" cy="33" r="30" />
            </svg>
          </div>
        }
        <div className="main-content">
          <div className="hero" id="hero">
            <div className="container">
              <h2>Memo 4 Me</h2>
              <p>Instantly connect with people while retaining privacy</p><a className="btn btn-primary btn-cta btn-lg btn-raised ui-wave" target="_blank" onClick={this.handleLogin}>Login</a>
            </div>
            <div className="img scrollreveal"><img src="/images/home_placeholder.png" /></div>
          </div>
        </div>
        <div className="features" id="features">
        <header>
          <h2 className="section-heading-underline">Key Features</h2>
        </header>
        <div className="container">
          <div className="row">
            <div className="col-md-4">
              <div className="icon-box ibox-plain ibox-center no-margin-top">
                <div className="ibox-icon"><a href="javascript:;"><i className="material-icons">devices</i></a></div>
                <h3>Responsive Design</h3>
                <p>mobile-ready design adopt to any device</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="icon-box ibox-plain ibox-center no-margin-top">
                <div className="ibox-icon"><a href="javascript:;"><i className="material-icons">card_travel</i></a></div>
                <h3>Material UI Kit</h3>
                <p>material design ui kit with tons of components</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="icon-box ibox-plain ibox-center no-margin-top">
                <div className="ibox-icon"><a href="javascript:;"><i className="material-icons">desktop_mac</i></a></div>
                <h3>Web App</h3>
                <p>single page application with React</p>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-4">
              <div className="icon-box ibox-plain ibox-center">
                <div className="ibox-icon"><a href="javascript:;"><i className="material-icons">view_quilt</i></a></div>
                <h3>Powerful Layout</h3>
                <p> <span>multiple layouts to choose from</span><br/><span>and build your own</span></p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="icon-box ibox-plain ibox-center">
                <div className="ibox-icon"><a href="javascript:;"><i className="material-icons">palette</i></a></div>
                <h3>Multiple Themes</h3>
                <p><span>18 predefined color schemes,</span><br/><span>light & dark themes</span></p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="icon-box ibox-plain ibox-center">
                <div className="ibox-icon"><a href="javascript:;"><i className="material-icons">remove_red_eye</i></a></div>
                <h3>High Resolution</h3>
                <p>high resolution screens are<br/><span>well supported</span></p>
              </div>
            </div>
          </div>
          
          </div>
          <div className="divider divider-xl"/>
          <p className="text-center text-muted"><em>... and much more</em></p>
        </div>

        <div className="faq" id="faq">
        <div className="container">
          <header>
            <h2 className="section-heading-underline">Why React</h2>
          </header>
          <ul className="faq-list">
            <li className="scrollreveal">
              <h4 className="faq-q">Develop Across All Platforms</h4>
              <p className="faq-a">Learn one way to build applications with React and reuse your code and abilities to build apps for any deployment target. For web, mobile web, native mobile and native desktop. Declarative views make your code more predictable and easier to debug.</p>
            </li>
            <li className="scrollreveal">
              <h4 className="faq-q">Declarative</h4>
              <p className="faq-a">React makes it painless to create interactive UIs. Design simple views for each state in your application, and React will efficiently update and render just the right components when your data changes.<br></br><span>Declarative views make your code more predictable and easier to debug.</span></p>
            </li>
            <li className="scrollreveal">
              <h4 className="faq-q">Component-Based</h4>
              <p className="faq-a">Build encapsulated components that manage their own state, then compose them to make complex UIs.<br></br><span>Since component logic is written in JavaScript instead of templates, you can easily pass rich data through your app and keep state out of the DOM. </span></p>
            </li>
            <li className="scrollreveal">
              <h4 className="faq-q">Learn Once, Write Anywhere</h4>
              <p className="faq-a">We don't make assumptions about the rest of your technology stack, so you can develop new features in React without rewriting existing code.<br></br><span>React can also render on the server using Node and power mobile apps using React Native.</span></p>
            </li>
          </ul>
        </div>
      </div>
      <div className="action-call text-center"><span className="scrollreveal">Getting started is easy. Be up and running in minutes.</span><a className="btn btn-default btn-cta btn-lg btn-raised ui-wave scrollreveal" href="#" onClick={this.handleLogin}>Login now</a></div>
      <footer className="footer text-center"><span>© Copyright <span id="copyright"></span> Material</span></footer>
        Home works!
        <button className="home-button" onClick={this.handleTest}>Click me</button>
        {/*<button onClick={this.handleLogin}>Login</button>*/}
      </div>
    )
  }
}