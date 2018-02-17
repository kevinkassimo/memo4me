import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { FilesCollection } from 'meteor/ostrio:files';

if (Meteor.isServer) {
  Meteor.publish('userData', function() {
    return Meteor.users.find({ _id: this.userId });
  });

  Meteor.publish('allUserData', function() {
    this.autorun(() => {
      return Meteor.users.find({}, {
        fields: {
          'profile.name': 1,
          'profile.bio': 1,
          'profile.avatar': 1,
          'profile.url': 1,
        }
      });
    })
  });

  Meteor.users.deny({
    insert() { return true; },
    update() { return true; },
    remove() { return true; },
  });
}
