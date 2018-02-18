import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { Mongo } from 'meteor/mongo';
import { withTracker } from 'meteor/react-meteor-data';

import QRCode from 'qrcode.react';

export default class Userpage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      profileId: null,
      profile: null,
      avatarSrc: null,
      hasUser: true,
    };
  }

  componentDidMount() {
    Meteor.call('account.getUserByURL', this.props.match.params.customUrl, (err, result) => {
      if (err || !result) {
        alert(`Cannot find user of that URL '${this.props.match.params.customUrl}'`);
        this.setState({
          hasUser: false,
        });
        return;
      }
      this.setState({
        profileId: result._id,
        profile: result.profile,
        avatarSrc: result.profile.avatar,
      });
    })
  }

  // dataDidReady = (err) => {
  //   if (!err) {
  //     Meteor.call('account.getUserByURL', this.props.match.params.customUrl, (err, result) => {
  //       if (err) {
  //         alert(`Cannot find user of that URL '${this.props.match.params.customUrl}'`);
  //         return;
  //       }
  //       this.setState({
  //         profileId: result._id,
  //         profile: result.profile,
  //       });
  //       Meteor.call('image.getImageById', result.profile.avatar, (err, img) => {
  //         if (img) {
  //           this.setState({
  //             avatarSrc: img.file,
  //           })
  //         }
  //       })
  //     })
  //
  //     // this.setState({
  //     //   profile: Meteor.users.find({'profile.url': this.props.match.params.customUrl}).fetch()[0].profile
  //     // });
  //   }
  // }
  //
  // componentDidMount() {
  //   Meteor.subscribe('allUserData', this.dataDidReady);
  // }

  handleMessageSend = e => {
    e.preventDefault();

    if (this.messageBodyElement.value.toString().trim().length <= 0) {
      alert('You cannot send an empty message!');
      return;
    }

    const {
      profileId
    } = this.state;

    const messageFrom = this.messageFromElement.value;
    const messageBody = this.messageBodyElement.value;

    Meteor.call('message.insert', profileId, messageBody, messageFrom, (err) => {
      if (err) {
        alert('There is a problem saving your message, please try again');
        return;
      }
      Meteor.call('broadcast.send', profileId, messageBody, messageFrom, (err) => {
        if (err) {
          alert(err);
          alert('There is a problem sending your message, please try again');
        } else {
          alert('Message is sent successfully!');
          this.messageFromElement.value = "";
          this.messageBodyElement.value = "";
        }
      })
    });
  };


  render() {
    const {
      profile,
      hasUser,
    } = this.state;

    return (
      <div>
        { /* has user, but is still loading */ }
        {(hasUser && !profile) &&
          <h1>LOADING...</h1>
        }

        { /* does not have user */ }
        {!hasUser &&
          <h1>Ooops, this URL does not match any of our users...</h1>
        }
        {/*this.state.avatarSrc*/}
        { profile &&
          <div>
            <div className="main-content">
              <div className="hero profile" id="hero">
                <img src= "https://t3.ftcdn.net/jpg/00/64/67/80/240_F_64678017_zUpiZFjj04cnLri7oADnyMH0XBYyQghG.jpg"  alt="User-Image"/>
                <h2>Greetings, this is {profile.name}!</h2>
                <p>{profile.bio}</p>
              </div>
            </div>
            <div className="message-board">
              <h3>Leave me a message below!</h3>
              <div className="paper">
              <form onSubmit={this.handleMessageSend} className="paper-text">

              <div className="group">
                <div className="center-wrapper">      
                  <input name="from" type="text" ref={el => this.messageFromElement = el} required/>
                  <span className="highlight"></span>
                  <span className="bar"></span>
                  <label htmlFor="from">From:</label>
                </div>
              </div>
              <br/>
              <div className="group">      
                <textarea cols="30" rows="3" name="body" type="textarea" ref={el => this.messageBodyElement = el} required/>
                <span className="highlight"></span>
                <span className="bar"></span>
                <label htmlFor="body">Message:</label>
              </div>

              {/*<div>
                <label htmlFor="from">From</label>
                <input name="from" type="text" ref={el => this.messageFromElement = el} />
              </div>
              <div>
                <label htmlFor="body">Message Body</label>
                <textarea name="body" cols="30" rows="10" ref={el => this.messageBodyElement = el} />
              </div>*/}
              <button className="btn" type="submit">Submit</button>
            </form>
            </div>
            </div>
            {/*<p>QRCode. Scan to visit this page</p>
            <QRCode value={window.location.href}/>*/}
          </div>
        }
        <footer className="footer text-center"><span>© Copyright <span id="copyright"></span> Material</span></footer>
      </div> 
    )
  }
}
