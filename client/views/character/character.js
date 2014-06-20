Template.character.rendered = function() {
  document.title = '';
  return $("<meta>", {
    name: "description",
    content: "Detail of character " + ''
  }).appendTo("head");
};
Template.character.invited_group = function () {
  var groups = null;
  if (this.invit_group_ids) {
    groups = Groups.find({ _id: { $in: this.invit_group_ids}});
  
  }
  return groups;
};
Template.character.your_group_name = function () {
  var group_name = null;
  if (this.group_id) {
    group = Groups.findOne({ _id: this.group_id });
    Session.set('current_group', group);
    if (group) {
        group_name = group.name;
    }
  } else {
    Session.set('current_group', null);
  }
  return group_name;
};
Template.character.characters_group = function () {
  var chars = null;
  if (Session.get("current_group")) {
    chars = Characters.find({ _id: { $in: Session.get("current_group").character_ids}});
  
  }
  return chars;
};
Template.character.events({
  'click .leave-group': function (evt) {
    Groups.update(Session.get("current_group")._id, {$pull: {character_ids: Session.get('selected_character')}});
    Characters.update(Session.get('selected_character'), {$unset: {group_id: this._id}});
     // prevent clicks on <a> from refreshing the page.
    evt.preventDefault();
  },
});  
Template.invited_group_tpl.events({
  'click .group_invit': function (evt) {
    // prevent clicks on <a> from refreshing the page.
    evt.preventDefault();
  },
  'click .accept-group': function (evt, template) {
    var character = Characters.findOne(Session.get('selected_character'));
    if (character.group_id) {
      window.alert('you must leave your group first');
    } else {
      Groups.update(this._id, {$push: {character_ids: Session.get('selected_character')}});
      Groups.update(this._id, {$pull: {invit_character_ids: Session.get('selected_character')}});
      Characters.update(Session.get('selected_character'), {$set: {group_id: this._id}});
      Characters.update(Session.get('selected_character'), {$pull: {invit_group_ids: this._id}});
    }
  },
  'click .declined-group': function () {
    Groups.update(this._id, {$pull: {invit_character_ids: Session.get('selected_character')}});
    Characters.update(Session.get('selected_character'), {$pull: {invit_group_ids: this._id}});
  },
});