import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Accounts } from 'meteor/accounts-base';

import Images from '/imports/api/image';
import DashboardHistory from './components/DashboardHistory';
import DashboardSettings from './components/DashboardSettings';

import { getEmailAddressesFromContacts } from '/imports/api/util';

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      shouldShowMessage: false,
    };
  }

  handleLogout = e => {
    Meteor.logout((err) => {
      if (err) {
        alert(err);
        return;
      }

      this.props.history.push('/');
    })
  };

  renderTab = () => {
    const {
      name,
      url: customUrl,
      bio,
    } = this.props.currentUser.profile;

    const messages = this.props.currentUser.profile.messages;

    const {
      shouldShowMessage,
    } = this.state;

    if (!shouldShowMessage) {
      return <DashboardSettings name={name} customUrl={customUrl} bio={bio} />;
    } else {
      return <DashboardHistory messages={messages} />;
    }
  }

  render() {
    const currentUser = this.props.currentUser;

    return (
      <div>
        <button onClick={this.handleLogout}>Logout</button>
        <div>
          <button onClick={() => this.setState({ shouldShowMessage: false })}>Profile</button>
          <button onClick={() => this.setState({ shouldShowMessage: true })}>History</button>
        </div>
        {currentUser &&
          this.renderTab()
        }
      </div>
    );
  }
}

export default withTracker((props) => {
  return {
    currentUser: Meteor.user(),
  }
})(Dashboard);