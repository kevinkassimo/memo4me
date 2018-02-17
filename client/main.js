import React from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { renderRoutes } from "../imports/startup/routes";

Tracker.autorun(function () {
  Meteor.subscribe("userData");
  Meteor.subscribe("allUserData");
  Meteor.subscribe('files.images.all');
});

Meteor.startup(() => {
  Meteor.subscribe("userData");
  Meteor.subscribe("allUserData");
  Meteor.subscribe('files.images.all');

  ReactDOM.render(renderRoutes(), document.getElementById('app'));
});