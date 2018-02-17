import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

const createNewMessage = (body = '', from = null) => {
  return {
    body,
    from,
  }
};

if (Meteor.isServer) {
  Meteor.methods({
    'message.insert': function insert(userId, body = '', from = null) {
      const targetUser = Meteor.users.findOne({ _id: userId });
      if (!targetUser) {
        throw new Meteor.Error('Cannot find user');
      }

      // only keeps past 10 message records
      let messages = targetUser.profile.messages.slice(0, 9);

      messages.unshift(createNewMessage(body, from));

      Meteor.users.update({ _id: userId },
        {
          $set: {
            'profile.messages': messages,
          }
        });
      return true;
    }
  })
}