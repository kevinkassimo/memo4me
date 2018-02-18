import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Accounts } from 'meteor/accounts-base';

export default class DashboardHistory extends Component {
  constructor(props) {
    super(props);
  }

  renderRecentMessages = () => {
    const {
      messages,
    } = this.props;

    return messages.map((msg, i) => {
      return (
        <div key={`msg-${i}`} className="msgEntry">
          <p className="msgEntry__from">From: {msg.from || 'Unknown Sender'}</p>
          <p className="msgEntry__when">At {new Date(msg.date).toLocaleString()}</p>
          <br/>
          <p className="msgEntry__body">{msg.body}</p>
        </div>
      )
    })
  };

  render() {
    const {
      currentUser
    } = this.props;

    return (
      <div>
        {this.renderRecentMessages()}
      </div>
    )
  }
}