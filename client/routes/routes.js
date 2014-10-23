/* global Meteor Router Session */
/* global Characters model */
/* global Groups model */
/* global AccountsEntry model */
/* global Characterposts model */
/* global Groupposts model */
/* global Blogposts model */
/* global Images model */
Router.map(function() {
  this.route('home', {
    path: '/',
    waitOn: function() {
      return [Meteor.subscribe('characters'), Meteor.subscribe('images')];
    }
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
      return [Meteor.subscribe('groups'), Meteor.subscribe('characters'), 
      Meteor.subscribe('characterposts'), Meteor.subscribe('images'), 
      Meteor.subscribe('rules')];
    },
    data: function() { 
      var char = Characters.findOne({name: this.params.name});
      if (char) {
        char.select();
      }
      return char;
    }
  });
  this.route('about', {
   waitOn: function() {
      return [Meteor.subscribe('images')];
    },
  });
  this.route('blog', {
    waitOn: function() {
      return [Meteor.subscribe('blogposts'), Meteor.subscribe('userData'), Meteor.subscribe('images')];
    },
  });
  this.route('accountsettings', {
    onBeforeAction: function() {
      return AccountsEntry.signInRequired(this);
    },
    waitOn: function() {
      return [Meteor.subscribe('images'), Meteor.subscribe('userData')];
    },
    data: function() { 
      return Meteor.user() ; 
    }
  });
  this.route('groups', {
    onBeforeAction: function() {
      return AccountsEntry.signInRequired(this);
    },
    waitOn: function() {
      return [Meteor.subscribe('groups'), Meteor.subscribe('characters'), Meteor.subscribe('images')];
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
      return [Meteor.subscribe('groups'), Meteor.subscribe('characters'), Meteor.subscribe('groupposts'), Meteor.subscribe('images')];
    },
    data: function() { 
      var group = Groups.findOne({name: this.params.name});
      if (group) {
        group.select();
        if (group.isOwner()) {
          Session.set('selected_character', 'master');
        }
      }
      return group;
    }
  });
});