/* global Template Meteor Session Router */
/* global Characters Images okCancelEvents */
Template.characters.rendered = function() {
  document.title = "Characters list";
  return $("<meta>", {
    name: "description",
    content: "List of your characters"
  }).appendTo("head");
};

Template.characters.events({
  'mousedown .character': function (evt) { // select character
    this.select();
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
