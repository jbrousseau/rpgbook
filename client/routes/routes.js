Router.map(function() {
  this.route('home', {
    path: '/'
  });
  this.route('characters', {
    onBeforeAction: function() {
      return AccountsEntry.signInRequired(this);
    },
    waitOn: function() {
      return Meteor.subscribe('characters');
    },
    data: function() { 
      return { charactersList: Characters.find({user_id: Meteor.userId()}) }; 
    }
  });
  this.route('character', {
    path: '/character/:name',
    waitOn: function() {
      return [Meteor.subscribe('groups'), Meteor.subscribe('characters')];
    },
    data: function() { 
      return Characters.findOne({name: this.params.name});
    }
  });
  this.route('about');
  this.route('account-settings');
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
  this.route('group');
});