import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo'
import { Accounts } from 'meteor/accounts-base';

import '/imports/api/user';
import '/imports/api/account';
import '/imports/api/contact';
import '/imports/api/image';
import '/imports/api/url';
import '/imports/api/message';
import '/imports/api/broadcast';

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
        messages: [
          {
            from: 'testUser',
            body: 'Bye bye',
            date: new Date().toLocaleString(),
          },
          {
            from: null,
            body: 'Bye bye 1',
            date: new Date().toLocaleString(),
          },
        ]
      }
    };

    Accounts.createUser(userObject);
  }
}

Meteor.startup(() => {
  // code to run on server at startup
  Meteor.users.remove({});
  insertTestUsers();

  Accounts.createUser({
    username: 'kassimo',
    email: 'kevinkassimo@gmail.com',
    password: '123',
    profile: {
      name: 'Kevin Qian',
      bio: 'BLAH',
      avatar: null,
      url: 'kevin',
      contacts: [
        {
          type: `email`,
          enabled: true,
          metadata: {
            address: `kevinkassimo@gmail.com`,
          },
        },
        {
          type: `email`,
          enabled: true,
          metadata: {
            address: `henrywcj@outlook.com`,
          },
        },
        {
          type: `email`,
          enabled: false,
          metadata: {
            address: `jackie19970410@gmail.com`,
          },
        },
      ],
      messages: [],
    }
  })
});
