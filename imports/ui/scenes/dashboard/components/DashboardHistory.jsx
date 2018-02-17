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
        <div key={`msg-${i}`}>
          <p>From: {msg.from || 'Unknown Sender'}</p>
          <p>At {new Date(msg.date).toLocaleString()}</p>
          <p>{msg.body}</p>
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