import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

import { ContactSchema, EmailContactMetadataSchema } from './schema';
import { getEmailAddressesFromContacts, isEmailAddress } from './util';
import ContactType from '../constants/contact-types';

const createEmailContact = function createEmailContact(address, enabled = true) {
  return {
    type: ContactType.EMAIL,
    enabled,
    metadata: {
      address,
    },
  };
};

if (Meteor.isServer) {
  Meteor.methods({
    'email.add': function add(address, isEnabled = true) {
      check(address, String);
      check(isEnabled, Boolean);

      if (!isEmailAddress(address)) {
        throw new Meteor.Error('${address} is not an email address');
      }

      const currentUser = Meteor.user();

      if (getEmailAddressesFromContacts(currentUser.profile.contacts).includes(address)) {
        // Already has email recorded
        throw new Meteor.Error(`Email address ${address} already in database`);
      }

      const newEmailContact = createEmailContact(address, isEnabled);

      return Meteor.users.update({ _id: this.userId },
        { $push: { 'profile.contacts': newEmailContact } });
    },

    'email.setEnabled': function setEnabled(address, isEnabled = true) {
      check(address, String);
      check(isEnabled, Boolean);

      return Meteor.users.update({ _id: this.userId, 'profile.contacts.metadata.address': address },
        { $set: { 'profile.contacts.$.enabled': isEnabled } });
    },

    'email.remove': function remove(address) {
      check(address, String);

      return Meteor.users.update({ _id: this.userId },
        { $pull: { 'profile.contacts': { 'metadata.address': address } } },
        { multi: true });
    },
  });
}
