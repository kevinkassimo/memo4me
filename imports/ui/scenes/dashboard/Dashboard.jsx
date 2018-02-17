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
  }

  render() {
    const {
      name,
      url: customUrl,
      bio,
    } = this.props.currentUser.profile;

    const messages = this.props.currentUser.profile.messages;

    return (
      <div>
        <DashboardSettings name={name} customUrl={customUrl} bio={bio} />
        <DashboardHistory messages={messages}/>
      </div>
    );
  }
}

export default withTracker((props) => {
  return {
    currentUser: Meteor.user(),
  }
})(Dashboard);