import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Accounts } from 'meteor/accounts-base';
import { DashboardEmail } from './components/DashboardEmail';
import Images from '/imports/api/image';
import DashboardHistory from './components/DashboardHistory';
import DashboardSettings from './components/DashboardSettings';

import { getEmailAddressesFromContacts } from '/imports/api/util';

class Content extends Component {

}

class NavBar extends Component {

}

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
      contacts,
    } = this.props.currentUser.profile;


    const messages = this.props.currentUser.profile.messages;

    const {
      shouldShowMessage,
    } = this.state;

    if (!shouldShowMessage) {
      return <DashboardSettings name={name} customUrl={customUrl} bio={bio} contacts={contacts} />;
    } else {
      return <DashboardHistory messages={messages} />;
    }

  }

  render() {
    const currentUser = this.props.currentUser;

    const contacts = currentUser ? currentUser.profile.contacts : [];

    return (
      <div>
        <div className='navBar'>
          <button className='navBarItem' onClick={() => this.setState({ shouldShowMessage: false })}>Profile</button>
          <button className='navBarItem' onClick={() => this.setState({ shouldShowMessage: true })}>History</button>
          <button className='navBarItem' id='logout' onClick={this.handleLogout}>Logout</button>
        </div>
        <div className='content'>
          {currentUser &&
            this.renderTab()
          }
        </div>
      </div>
    );
  }
}

export default withTracker((props) => {
  return {
    currentUser: Meteor.user(),
  }
})(Dashboard);