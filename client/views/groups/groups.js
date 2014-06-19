Template.groups.rendered = function() {
  document.title = "groups list";
  return $("<meta>", {
    name: "description",
    content: "List of your groups"
  }).appendTo("head");
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
