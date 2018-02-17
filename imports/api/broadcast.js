import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

import ContactType from '../constants/contact-types';

// This should be used under 'try {} catch (e) {}'
export const serverBroadcast = function serverBroadcast(userId, message) {
  check(userId, String);
  check(message, String);

  const targetUser = Meteor.users.findOne({ _id: userId }); // this is an object
  if (!targetUser) {
    throw new Meteor.Error(`Cannot find user ${userId}`);
  }

  if (!targetUser.profile) {
    throw new Meteor.Error(`Invalid profile of user ${userId}`);
  }

  try {
    const emailContacts = targetUser.profile.contacts.filter(contact => contact.type === ContactType.EMAIL);
    serverBroadcastEmail(serverBroadcastEmail(emailContacts));
  } catch (e) {
    throw new Meteor.Error(`Broadcast email for ${userId} failed`);
  }
};

const serverBroadcastEmail = function serverBroadcastEmail(emailContacts) {
  const emails = emailContacts.map(contact => contact.metadata.address);

  // TODO: implement me
}