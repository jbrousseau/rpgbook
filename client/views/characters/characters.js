/* global Template Meteor Session Router */
/* global Characters Images okCancelEvents */
Template.characters.rendered = function() {
  document.title = "Characters list";
  return $("<meta>", {
    name: "description",
    content: "List of your characters"
  }).appendTo("head");
};

Template.characters.selected = function () {
  return Session.equals('selected_character', this._id) ? 'selected' : '';
};
Template.characters.name_class = function () {
  return this.name ? '' : 'empty';
};
Template.characters.avatarFile = function() {
  var avatarFile = [{url:"/img/character/empty.gif"}];
  if (this.avatarfile_id) {
    avatarFile = Images.find({_id: this.avatarfile_id});
  }
  return avatarFile;
};

Template.characters.events({
  'mousedown .character': function (evt) { // select character
    Session.set('selected_character', this._id);
    Session.set('character_user_id', this.user_id);
  },
  'click .display, click .avatardisplay': function (evt) {
    // prevent clicks on <a> from refreshing the page.
    //evt.preventDefault();
    Router.go('character', {name: this.name});
  },
  'click .character-name': function (evt) {
    // prevent clicks on <a> from refreshing the page.
    evt.preventDefault();
  },
  'click .destroy': function () {
    Characters.remove(this._id);
  },
});
Template.characters.events(okCancelEvents(
  '#new-character',
  {
    ok: function (text, evt) {
      Characters.insert({
        name: text,
        user_id:  Meteor.userId(),
        done: false,
        timestamp: (new Date()).getTime()
      });
      evt.target.value = '';
    }
  })
);
