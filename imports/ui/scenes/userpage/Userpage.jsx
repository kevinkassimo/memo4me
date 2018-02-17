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
    };
  }

  componentDidMount() {
    Meteor.call('account.getUserByURL', this.props.match.params.customUrl, (err, result) => {
      if (err) {
        alert(`Cannot find user of that URL '${this.props.match.params.customUrl}'`);
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


  render() {
    const {
      profile
    } = this.state;

    return (
      <div>
        Userpage works!
        { profile &&
          <div>
            <img src={this.state.avatarSrc} />
            <p>{profile.name}</p>
            <p>{profile.bio}</p>
            <QRCode value={window.location.href}/>
          </div>
        }
      </div>
    )
  }
}
