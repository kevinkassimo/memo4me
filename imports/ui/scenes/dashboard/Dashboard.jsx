import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Accounts } from 'meteor/accounts-base';

import Images from '/imports/api/image';


class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isAvatarUploading: false,
    };
  }

  handleLogout = e => {
    Meteor.logout((err) => {
      if (err) {
        alert(err);
        return;
      }

      this.props.history.push('/');
    })
  };

  handleAddContact = e => {
    e.preventDefault();

    Meteor.call('email.add', this.newEmailElement.value, (err) => {
      if (err) {
        alert(err);
        return;
      }
      alert('New email added');
    })
  };

  handleUploadAvatar = e => {
    e.preventDefault();

    const file = this.avatarInput.files[0];
    if (file) {
      const uploadInstance = Images.insert({
        file: file,
        streams: 'dynamic',
        chunkSize: 'dynamic'
      }, false);

      uploadInstance.on('start', () => {
        this.setState({
          isAvatarUploading: true,
        })
      });

      uploadInstance.on('end', (error, fileObj) => {
        if (error) {
          window.alert('Error during upload: ' + error.reason);
        } else {
          window.alert('File "' + fileObj.name + '" successfully uploaded');
        }
        Meteor.call('image.setAvatar', fileObj, (err) => {
          if (err) {
            window.alert('Error during updating avatar: ' + error.reason);
          } else {
            window.alert('Avatar updated successful');
          }

          this.setState({
            isAvatarUploading: false,
          });
        });
      });

      uploadInstance.start();
    }
  };

  render() {
    const {
      currentUser
    } = this.props;

    return (
      <div>
        Dashboard works!
        <button onClick={this.handleLogout}>Logout</button>
        <div>
          <h3>Add email</h3>
          <form onSubmit={this.handleAddContact}>
            <input type="text" name="email" ref={el => this.newEmailElement = el} />
            <button type="submit">Submit</button>
          </form>
        </div>

        <div>
          <h3>Update Image</h3>
          <form onSubmit={this.handleUploadAvatar}>
            <input disabled={this.state.isAvatarUploading} id="fileInput" type="file" ref={el => this.avatarInput = el} />
            <p><small>Upload file in <code>jpeg</code> or <code>png</code> format, with size less or equal to 10MB</small></p>
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    )
  }
}

export default withTracker((props) => {
  return {
    currentUser: Meteor.user(),
  }
})(Dashboard);