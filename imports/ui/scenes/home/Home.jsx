import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { Link } from 'react-router-dom';

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
    e.preventDefault();
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
                <div className="ibox-icon"><a href="javascript:;"><i className="material-icons">Tubiao</i></a></div>
                <h3>Material UI Design</h3>
                <p>Simple but effective UI/UX design</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="icon-box ibox-plain ibox-center no-margin-top">
                <div className="ibox-icon"><a href="javascript:;"><i className="material-icons">Tubiao</i></a></div>
                <h3>Message Reroute</h3>
                <p>Smooth, instant and effective connection</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="icon-box ibox-plain ibox-center no-margin-top">
                <div className="ibox-icon"><a href="javascript:;"><i className="material-icons">Tubiao</i></a></div>
                <h3>Privacy Protection</h3>
                <p>Substitute personal info with QR code</p>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-4">
              <div className="icon-box ibox-plain ibox-center">
                <div className="ibox-icon"><a href="javascript:;"><i className="material-icons">Tubiao</i></a></div>
                <h3>Effective Communication</h3>
                <p>Organized and targeted communication between users</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="icon-box ibox-plain ibox-center">
                <div className="ibox-icon"><a href="javascript:;"><i className="material-icons">Tubiao</i></a></div>
                <h3>Multiple Platform</h3>
                <p>Communication includes email, facebook messenger, and text</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="icon-box ibox-plain ibox-center">
                <div className="ibox-icon"><a href="javascript:;"><i className="material-icons">Tubiao</i></a></div>
                <h3>Efficient Contact Management</h3>
                <p>Deeper understanding of the background of your contacts</p>
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
            <h2 className="section-heading-underline">Why Memo4 Me</h2>
            <p className="faq-a">Memo4 Me effectively faciliates the communication between attendees for various events, such as college career fairs, professional networking events, academic conferences, etc. By creating an event-specific personal QR code linked to Memo 4 me users' personal emails or facebook, our users are able to initiate conversations, send and receive messages with other attendees for this specific events. Moreover, they can freely enable or disable the linkage between the event-specific personal QR code and their contact methods.</p>
          </header>
          <ul className="faq-list">
            <li className="scrollreveal">
              <h4 className="faq-q">Simplified Communication</h4>
              <p className="faq-a">During an event, people are reluctant to give out their personal contact information to strangers. Many of them even create event-specific emails to receive messages from people they met in that event. Memo 4 Me provides a simplified method to solve this problem by providing QR code linked to their personal contact information and they are disable the link once they are disinterested. </p>
            </li>
            <li className="scrollreveal">
              <h4 className="faq-q">Personal information Protection</h4>
              <p className="faq-a">Memo 4 Me provides QR code as a substitute for users' personal contact information. In such way, users can choose to not disclose their personal information such as email address, and phone number during a event, but still receive messages from the people they met during that event.</p>
            </li>
            <li className="scrollreveal">
              <h4 className="faq-q">Effective Contact Info Management</h4>
              <p className="faq-a">By creating event-specific personal QR code linked to users' personal emails or text, Memo 4 Me simplifies the contact information management process for our users. Our users can easily recognize the their contacts' identities based on their personal information and the QR code their contacts possessed. In this way, Memo 4 Me offers a comprehensive solution for its users to manage contacts for specific events </p>
            </li>
            <li className="scrollreveal">
              <h4 className="faq-q">Multiplatform Message Reception</h4>
              <p className="faq-a">Besides email notification to our user, Memo 4 Me also provides linkages between QR code and Facebook Messengers and between QR code and text. Such multiplatform features enables fast and secure transmission of messages between Memo 4 Me users using whatever platform they prefer.</p>
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