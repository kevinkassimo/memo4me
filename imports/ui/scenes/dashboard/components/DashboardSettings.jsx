import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Accounts } from 'meteor/accounts-base';

import Images from '/imports/api/image';

export default class DashboardSettings extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isAvatarUploading: false,

      customUrl: this.props.customUrl,
      name: this.props.name,
      bio: this.props.bio,
    };

    /*
    this.props = {
      customUrl: '',
      name: '',
      bio: '',
    }
     */
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

  handleUpdateProfile = e => {
    e.preventDefault();
    const {
      name,
      customUrl,
      bio,
    } = this.state;

    Meteor.call('account.update', { name, url: customUrl, bio }, (err) => {
      if (err) {
        alert(err);
        return;
      }

      alert('Profile update successful!');
    })
  };

  renderAddImage = () => {
    const {
      isAvatarUploading,
    } = this.state;

    return (
      <div>
        <h3>Update Image</h3>
        <form onSubmit={this.handleUploadAvatar}>
          <input disabled={isAvatarUploading} id="fileInput" type="file" ref={el => this.avatarInput = el} />
          <p><small>Upload file in <code>jpeg</code> or <code>png</code> format, with size less or equal to 10MB</small></p>
          <button disabled={isAvatarUploading} type="submit">Submit</button>
        </form>
      </div>
    );
  };

  renderProfileSettings = () => {
    return (
      <div>
        <h3>Profile Settings</h3>
        <form onSubmit={this.handleUpdateProfile}>
          <div>
            <label htmlFor="name">Name: </label>
            <input type="text" value={this.state.name} onChange={e => this.setState({ name: e.target.value })}/>
          </div>
          <div>
            <label htmlFor="bio">Bio: </label>
            <textarea name="bio" cols="30" rows="10" value={this.state.name} onChange={e => this.setState({ bio: e.target.value })} />
          </div>
          <div>
            <label htmlFor="customUrl">Custom URL: </label>
            <input type="text" value={this.state.customUrl} onChange={e => this.setState({ customUrl: e.target.value })}/>
          </div>
          <button type="submit">Update</button>
        </form>
      </div>
    )
  }

  render() {
    const {
      currentUser
    } = this.props;

    return (
      <div>
        <button onClick={this.handleLogout}>Logout</button>
        {this.renderAddImage()}
        {this.renderProfileSettings()}
      </div>
    );
    //
    // return (
    //   <div>
    //     <button onClick={this.handleLogout}>Logout</button>
    //     {this.renderAddImage()}
    //
    //     <div>
    //       <h3>Add email</h3>
    //       <form onSubmit={this.handleAddContact}>
    //         <input type="text" name="email" ref={el => this.newEmailElement = el} />
    //         <button type="submit">Submit</button>
    //       </form>
    //     </div>
    //
    //     <div>
    //       <h3>Update Image</h3>
    //       <form onSubmit={this.handleUploadAvatar}>
    //         <input disabled={this.state.isAvatarUploading} id="fileInput" type="file" ref={el => this.avatarInput = el} />
    //         <p><small>Upload file in <code>jpeg</code> or <code>png</code> format, with size less or equal to 10MB</small></p>
    //         <button type="submit">Submit</button>
    //       </form>
    //     </div>
    //   </div>
    // )
  }
}