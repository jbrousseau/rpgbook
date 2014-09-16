/* global Template, Groups Session Meteor Router okCancelEvents*/
Template.groups.rendered = function() {
  document.title = "groups list";
  //Groups.unSelect();
  return $("<meta>", {
    name: "description",
    content: "List of your groups"
  }).appendTo("head");
};


Template.groups.selected_name = function() {
  var group = Groups.selected();
  return group && group.name;
};

Template.groups.events({
  'mousedown .group': function(evt) { // select group
    this.select();
  },
  'click .group': function(evt) {
    // prevent clicks on <a> from refreshing the page.
    evt.preventDefault();
  },
  'click .destroy': function() {
    Groups.remove(this._id);
  },
  'click .go': function() {
    Router.go('group', {
      name: this.name
    });
  },
});
Template.groups.events(okCancelEvents(
  '#new-group', {
    ok: function(text, evt) {
      Groups.insert({
        name: text
      });
      evt.target.value = '';
    }
  }));
