Template.groups.rendered = function() {
  document.title = "groups list";
  return $("<meta>", {
    name: "description",
    content: "List of your groups"
  }).appendTo("head");
  Session.set("selected_character", null);
};

Template.groups.selected = function () {
  return Session.equals('selected_group', this._id) ? 'selected' : '';
};
Template.groups.selected_name = function () {
    var group = Groups.findOne(Session.get("selected_group"));
    return group && group.name;
  };
Template.groups.name_class = function () {
  return this.name ? '' : 'empty';
};
Template.character.groupsCharList = function () {
  var characters = null;
  if (this.invit_group_ids) {
    groups = Groups.find({ _id: { $in: this.invit_group_ids}});
  
  }
  return characters;
};

Template.groups.events({
  'mousedown .group': function (evt) { // select group
    Session.set('selected_group', this._id);
  },
  'click .group': function (evt) {
    // prevent clicks on <a> from refreshing the page.
    evt.preventDefault();
  },
  'click .destroy': function () {
    Groups.remove(this._id);
  },
  'click .go': function () {
    Router.go('group', {name: this.name});
  },
});
Template.groups.events(okCancelEvents(
  '#new-group',
  {
    ok: function (text, evt) {
      Groups.insert({
        name: text,
        user_id:  Meteor.userId(),
        done: false,
        timestamp: (new Date()).getTime()
      });
      evt.target.value = '';
    }
  })
);
