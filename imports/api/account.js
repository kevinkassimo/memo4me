import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
import { Accounts } from 'meteor/accounts-base';
import { isEmailAddress } from './util';

export const createNewProfileObject = function createNewProfileObject() {
  return {
    name: '(Name of set)',
    bio: '(Bio not set)',
    avatar: null,
    url: null,
    contacts: [],
    messages: [],
  }
};

export const createNewUserObject = function createNewUserObject(username, email, password) {
  return {
    username: username,
    email: email,
    password: password,
    profile: createNewProfileObject(),
  };
};

if (Meteor.isServer) {
  Meteor.methods({
    // Create a new user account
    'account.create': function create(username, email, password, name, url) {
      check(username, String);
      check(email, String);
      check(password, String);
      check(name, String);
      check(url, String);

      if (!username || !email || !password) {
        throw new Meteor.Error('Username, email or password cannot be empty');
      }

      if (!isEmailAddress(email)) {
        throw new Meteor.Error('Email must be of email format');
      }

      if (Meteor.users.findOne({ 'profile.url': url })
        || Meteor.users.findOne({ 'email.address': email })
        || Meteor.users.findOne({ 'username': username })) {
        throw new Meteor.Error('URL has been used by someone else');
      }

      const userObject = createNewUserObject(username, email, password);
      userObject.profile.name = name;
      userObject.profile.url = url;

      return Accounts.createUser(userObject);
    },

    'account.update': function create({ name, bio, url }) {
      if (name) {
        check(name, String);

        Meteor.users.update({ _id: this.userId }, {
          $set: {
            'profile.name': name,
          },
        });
      }

      if (bio) {
        check(bio, String);
        Meteor.users.update({ _id: this.userId }, {
          $set: {
            'profile.bio': bio,
          },
        });
      }


      if (url) {
        check(url, String);

        if (Meteor.users.findOne({ _id: { $ne: this.userId } ,'profile.url': url })) {
          throw new Meteor.Error(`This URL '${url}' has been used by another user`);
        }

        Meteor.users.update({ _id: this.userId }, {
          $set: {
            'profile.url': url,
          },
        });
      }
    },

    // Get User by URL
    'account.getUserByURL': function getUserByURL(url) {
      check(url, String);

      const urlUser = Meteor.users.findOne({ 'profile.url': url }, {
        fields: {
          _id: 1,
          'profile.name': 1,
          'profile.bio': 1,
          'profile.avatar': 1,
          'profile.url': 1,
        }
      });
      if (urlUser) {
        return urlUser;
      } else {
        return null;
      }
    },

    'account.getAllUsers': function getAllUsers() {
      return Meteor.users.find({}).fetch();
    }
  });
}