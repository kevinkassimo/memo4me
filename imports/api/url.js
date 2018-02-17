import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

if (Meteor.isServer) {
  Meteor.methods({
    // Update user's profile url
    'url.update': function update(url) {
      check(url, String);

      if (!isEmailAddress(address)) {
        throw new Meteor.Error(`'${address}' is not an email address`);
      }

      if (Meteor.user().profile.url === url) {
        throw new Meteor.Error(`'${url}' is the same as the original one`);
      }

      if (Meteor.users.findOne({ 'profile.url': url })) {
        throw new Meteor.Error('URL has been used by someone else');
      }

      return Meteor.users.update({ _id: this.userId },
        { $set: { 'profile.url': url } });
    },
  });
}
