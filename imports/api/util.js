import ContactType from '../constants/contact-types';

export const getEmailContacts = contacts => contacts.filter(contact => contact.type === ContactType.EMAIL);

export const getEmailAddressesFromContacts = contacts => getEmailContacts(contacts).map(contact => contact.metadata.address);

export const isEmailAddress = address =>
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(address);