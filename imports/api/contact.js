import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

import { ContactSchema, EmailContactMetadataSchema } from './schema';
import { isEmailAddress, isTextNumber } from './util';
import ContactType from '../constants/contact-types';

const createContact = (type, value, enabled = true) => {
  return {
    type: type, 
    enabled: enabled,
    metadata: {
      address: value,
    },
  };
};

function checkMetadata(value, type) {
  switch (type) {
    case ContactType.EMAIL:  
      if (!isEmailAddress(value)) {
        throw new Meteor.Error(`${value} is not an email address`);
      }
      break;
    case ContactType.TEXT:
      if (!isTextNumber(value)) {
        throw new Meteor.Error(`${value} is not a valid text number`);
      }
      break;
    default:
      break;
  }
}


if (Meteor.isServer) {
  Meteor.methods({
    'contact.add': function add(value, type, isEnabled = true) {
      check(value, String);
      check(isEnabled, Boolean);
      checkMetadata(value, type);

      const currentUser = Meteor.user();
      const contacts = currentUser.profile.contacts.filter(c => c.type === type);
      const contactInfo = contacts.map(x => x.metadata.address);

      if (contactInfo.includes(value)) {
        // Already has email recorded
        throw new Meteor.Error(`${value} already in database`);
      }

      const newContact = createContact(type, value, isEnabled);

      

      return Meteor.users.update( { _id: this.userId },
        { $push: 
          { 'profile.contacts': newContact
          } 
        }
      );
    },

    'contact.setEnabled': function setEnabled(value, isEnabled = true) {
      check(value, String);
      check(isEnabled, Boolean);

      return Meteor.users.update({ _id: this.userId, 'profile.contacts.metadata.address': value },
        { $set: { 'profile.contacts.$.enabled': isEnabled } });
    },

    'contact.remove': function remove(value) {
      check(value, String);

      return Meteor.users.update({ _id: this.userId },
        { $pull: { 'profile.contacts': { 'metadata.address': value } } },
        { multi: true });
    },
  });
}
