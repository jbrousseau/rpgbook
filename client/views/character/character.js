/* global Meteor Template Session Router */
/* global Groups Characters Images Rules okCancelEvents */
var editable = function() {
  var userId = Meteor.userId();
  var character_user_id = Session.get("character_user_id");
  if (character_user_id == userId) {
    return true;
  } else {
    return false;
  }
};

Template.character.rendered = function() {
  document.title = '';
  return $("<meta>", {
    name: "description",
    content: "Detail of character " + ''
  }).appendTo("head");
};
Template.character.editable = function() {
  return editable();
};
Template.character.listrules = function() {
  return Rules.find({});
};
Template.character.chooserule = function() {
  if (!this.rules_name && editable() ) {
    return true;
  } else {
    return false;
  }
};
Template.character.selected_rule = function(rule) {
  if (rule && rule.title && rule.title==this.rules_name) {
    return true;
  } else {
    return false;
  }
};
Template.character.invited_group = function () {
  var groups = null;
  if (this.invit_group_ids) {
    groups = Groups.find({ _id: { $in: this.invit_group_ids}});
  
  }
  return groups;
};
Template.character.character_attributes = function () {
  var atts = null;
  if (this.characterattributes) {
      atts = this.characterattributes.map(function(data, i) {
      data['index'] = i;
      return data;
    });
  }
  return atts;
};
Template.character.your_group_name = function () {
  var group_name = null;
  if (this.group_id) {
    var group = Groups.findOne({ _id: this.group_id });
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
    //evt.preventDefault();
  },
  'click .view-group': function (evt) {
      var group = Session.get('current_group');
      if (group) {
        Router.go('group', {name: group.name});
      }
  },
  'change .rules_select': function (evt) {
      var rule = Rules.findOne({title:evt.target.value});
      if (rule && !this.rules_name && evt.target.value!='none') {
        Characters.update(Session.get('selected_character'), {$set: {rules_name: evt.target.value},
                                                            $push:{ characterattributes: { $each: rule.attributes } } });
      }
      evt.preventDefault();
  },
});
Template.character.events(okCancelEvents(
  '#new-description',
  {
    ok: function (text, evt, template) {
      Characters.update(Session.get('selected_character'), {$set:{ description: text}});

      evt.target.value = text;
    }
  })
);
Template.character.events(okCancelEvents(
  '#new-character-attribute',
  {
    ok: function (text, evt, template) {
      Characters.update(Session.get('selected_character'), {$push:{ characterattributes: {name: text}}});

      evt.target.value = '';
    }
  })
);
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

Template.character_attributes_tpl.editable = function() {
  return editable();
};

Template.character_attributes_tpl.events(okCancelEvents(
  '#new-character-attribute-value',
  {
    ok: function (text, evt, template) {
      var modifier = new Object({});
      modifier['characterattributes.' + this.index + '.value'] = text;
      Characters.update(Session.get('selected_character'), {$set: modifier});
      evt.target.value = text;
    }
  })
);

Template.avatarcharacter.editable = function() {
  return editable();
};
Template.avatarcharacter.events({
  'change .avatarInput': function(event, template) {
    var charId = Session.get('selected_character');
    var files = event.target.files;
    if (event.target.id) {
      Images.remove(event.target.id);
    }
    Images.insert(files[0], function(err, fileObj) {
      if (charId) {
         Characters.update(Session.get('selected_character'),  {$set: {'avatarfile_id': fileObj._id }});
      }
    });
  }
});