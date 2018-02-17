import SimpleSchema from 'simpl-schema';
import ContactType from '../constants/contact-types';

/*
Usage:
let isOkay = ProfileSchema.validate(data)
let cleanedData = ProfileSchema.clean(data)
 */
export const ProfileSchema = new SimpleSchema({
  name: String,
  bio: String, // biography
  avatar: String, // imageId at Image collection
  url: String, // custom url of one's profile
  contacts: [Object],
  messages: [Object],
}, {
  clean: {
    trimStrings: true,
    removeNullsFromArrays: true,
  },
},);

export const ContactSchema = new SimpleSchema({
  type: String,
  enabled: Boolean,
  metadata: Object,
});

export const EmailContactMetadataSchema = new SimpleSchema({
  address: String
});

export const MessageSchema = new SimpleSchema({
  from: String,
  body: String,
});

