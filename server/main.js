import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo'
import { Accounts } from 'meteor/accounts-base';

import '/imports/api/user';
import '/imports/api/account';
import '/imports/api/email';
import '/imports/api/image';
import '/imports/api/url';
import '/imports/api/message';

if (Meteor.isServer) {

}

function insertTestUsers() {
  for (let i = 0; i < 10; i++) {
    let userObject = {
      username: `user${i}`,
      email: `email${i}@test.com`,
      password: `password${i}`,
      profile: {
        name: `name${i}`,
        bio: `bio${i}`,
        avatar: null,
        url: `url${i}`,
        contacts: [
          {
            type: `email`,
            enabled: i % 2 === 0,
            metadata: {
              address: `email${i}@hidden0.com`,
            }
          },
          {
            type: `email`,
            enabled: i % 2 !== 0,
            metadata: {
              address: `email${i}@hidden1.com`,
            }
          },
        ],
        messages: []
      }
    }

    Accounts.createUser(userObject);
  }
}

Meteor.startup(() => {
  // code to run on server at startup
  Meteor.users.remove({});
  insertTestUsers();
});
