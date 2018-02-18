import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

import ContactType from '../constants/contact-types';

import { sendEmail } from './sparkpost/sparkpost';
import { sendText } from './textbelt/textbelt';

// This should be used under 'try {} catch (e) {}'
export const serverBroadcast = function serverBroadcast(userId, body = '', from = '') {
  check(userId, String);
  check(body, String);
  check(from, String);

  const targetUser = Meteor.users.findOne({ _id: userId }); // this is an object
  if (!targetUser) {
    throw new Meteor.Error(`Cannot find user ${userId}`);
  }

  if (!targetUser.profile) {
    throw new Meteor.Error(`Invalid profile of user ${userId}`);
  }

  try {
    const emailContacts = targetUser.profile.contacts.filter(contact => contact.type === ContactType.EMAIL && contact.enabled);
    if (emailContacts && emailContacts.length > 0) {
      serverBroadcastEmail(emailContacts, body, from);
    }
  } catch (e) {
    throw e;
    // throw new Meteor.Error(`Broadcast email for ${userId} failed`);
  }

  try {
    const textContacts = targetUser.profile.contacts.filter(contact => contact.type === ContactType.TEXT && contact.enabled);
    if (textContacts && textContacts.length > 0) {
      serverBroadcastText(textContacts, body, from);
    }
  } catch (e) {
    throw e;
  }
};

const serverBroadcastEmail = function serverBroadcastEmail(emailContacts, body = '', from = '') {
  const emails = emailContacts.map(contact => contact.metadata.address);

  // TODO: implement me
  for (let email of emails) {
    sendEmail(email, 'New message from Memo4Me',
`
<html>
<body>
    <h1>A new message from ${from || 'Unknown Sender'}</h1>
    <p>Hi, this is Memo4Me.com. A new message has arrived!</p>
    <p style="font-size: 1.5em">
    ${body}
    </p>
    <p>Best, Memo4Me Team</p>
</body>
</html>
      `, (data) => {
        console.log(data);
      }, (err) => {
        if (err) {
          throw new Meteor.Error(err)
        }
      });
  }
};

const serverBroadcastText = function serverBroadcastText(textContacts, body = '', from = '') {
  const numbers = textContacts.map(contact => contact.metadata.address);
  for (let number of numbers) {
    sendText(number, body, from);
  }
};

if (Meteor.isServer) {
  Meteor.methods({
    'broadcast.send': function send(userId, body = '', from = null) {
      // send
      try {
        serverBroadcast(userId, body, from);
      } catch (e) {
        throw e;
      }
      return true;
    }
  })
}