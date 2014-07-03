/* global Meteor Router */
/* global Characters model */
/* global Groups model */
/* global Characterposts model */
/* global Groupposts model */
/* global Blogposts model */
/* global Images model */
Router.map(function() {
  this.route('home', {
    path: '/'
  });
  this.route('characters', {
    onBeforeAction: function() {
      return AccountsEntry.signInRequired(this);
    },
    waitOn: function() {
      return [Meteor.subscribe('characters'), Meteor.subscribe('images')];
    },
    data: function() { 
      return { charactersList: Characters.find({user_id: Meteor.userId()}) }; 
    }
  });
  this.route('character', {
    path: '/character/:name',
    waitOn: function() {
      return [Meteor.subscribe('groups'), Meteor.subscribe('characters'), Meteor.subscribe('characterposts'), Meteor.subscribe('images')];
    },
    data: function() { 
      return Characters.findOne({name: this.params.name});
    }
  });
  this.route('about');
  this.route('blog', {
    waitOn: function() {
      return [Meteor.subscribe('blogposts')];
    },
  });
  this.route('accountsettings', {
    onBeforeAction: function() {
      return AccountsEntry.signInRequired(this);
    },
    waitOn: function() {
      return [Meteor.subscribe('images')];
    },
  });
  this.route('groups', {
    onBeforeAction: function() {
      return AccountsEntry.signInRequired(this);
    },
    waitOn: function() {
      return [Meteor.subscribe('groups'), Meteor.subscribe('characters')];
    },
    data: function() { 
      return { groupsList: Groups.find({user_id: Meteor.userId()}) }; 
    }
  });
  this.route('group', {
    path: '/group/:name',
    onBeforeAction: function() {
      return AccountsEntry.signInRequired(this);
    },
    waitOn: function() {
      return [Meteor.subscribe('groups'), Meteor.subscribe('characters'), Meteor.subscribe('groupposts')];
    },
    data: function() { 
      return Groups.findOne({name: this.params.name});
    }
  });
});