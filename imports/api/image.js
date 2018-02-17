import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
import { FilesCollection } from 'meteor/ostrio:files';

const Images = new FilesCollection({
  debug: true,
  collectionName: 'Images',
  allowClientCode: false, // Disallow remove files from Client
  onBeforeUpload: function (file) {
    // Allow upload files under 10MB, and only in png/jpg/jpeg formats
    if (file.size <= 1024 * 1024 * 10 && /png|jpe?g/i.test(file.extension)) {
      return true;
    }
    return 'Please upload image, with size equal or less than 10MB';
  }
});

if (Meteor.isServer) {
  Images.denyClient();
  Meteor.publish('files.images.all', function () {
    return Images.find().cursor;
  });

  Meteor.methods({
    'image.getImageById': function getImageById(id) {
      return Mongo.Collection.get('Images').findOne({ _id: id });
    },

    'image.setAvatar': function uploadAvatar(fileRef) {
      Meteor.users.update({ _id: this.userId }, { $set: { 'profile.avatar': Images.link(fileRef) } });
    }
  })
}
export default Images;