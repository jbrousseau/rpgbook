/* global Meteor Template Session Router */
/* global Groups Characters Images Rules okCancelEvents */
Template.character.rendered = function() {
  document.title = '';
  return $("<meta>", {
    name: "description",
    content: "Detail of character " + ''
  }).appendTo("head");
};

Template.character.listrules = function() {
  return Rules.find({});
};
Template.character.chooserule = function() {
  if (!this.rules_name && this && this.isOwner() ) {
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
    if (group) {
        group.select();
        group_name = group.name;
    }
  } else {
    Groups.unSelect();
  }
  return group_name;
};
Template.character.characters_group = function () {
  var chars = null;
  if (Groups.selectedId()) {
    chars = Characters.find({ _id: { $in: Groups.selected().character_ids}});
  
  }
  return chars;
};
Template.character.events({
  'click .leave-group': function (evt) {
    Groups.update(Groups.selectedId(), {$pull: {character_ids: Characters.selectedId()}});
    Characters.update(Characters.selectedId(), {$unset: {group_id: this._id}});
     // prevent clicks on <a> from refreshing the page.
    //evt.preventDefault();
  },
  'click .view-group': function (evt) {
      var group = Groups.selected();
      if (group) {
        Router.go('group', {name: group.name});
      }
  },
  'change .rules_select': function (evt) {
      var rule = Rules.findOne({title:evt.target.value});
      if (rule && !this.rules_name && evt.target.value!='none') {
        Characters.update(Characters.selectedId(), {$set: {rules_name: evt.target.value},
                                                            $push:{ characterattributes: { $each: rule.attributes } } });
      }
      evt.preventDefault();
  },
});
Template.character.events(okCancelEvents(
  '#new-description',
  {
    ok: function (text, evt, template) {
      Characters.update(Characters.selectedId(), {$set:{ description: text}});

      evt.target.value = text;
    }
  },
  '#new-character-attribute',
  {
    ok: function (text, evt, template) {
      Characters.update(Characters.selectedId(), {$push:{ characterattributes: {name: text}}});

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
    var character = Characters.selected();
    if (character.group_id) {
      window.alert('you must leave your group first');
    } else {
      Groups.update(this._id, {$push: {character_ids: Characters.selectedId()}});
      Groups.update(this._id, {$pull: {invit_character_ids: Characters.selectedId()}});
      Characters.update(Characters.selectedId(), {$set: {group_id: this._id}});
      Characters.update(Characters.selectedId(), {$pull: {invit_group_ids: this._id}});
    }
  },
  'click .declined-group': function () {
    Groups.update(this._id, {$pull: {invit_character_ids: Characters.selectedId()}});
    Characters.update(Characters.selectedId(), {$pull: {invit_group_ids: this._id}});
  },
});

Template.character_attributes_tpl.events(okCancelEvents(
  '#new-character-attribute-value',
  {
    ok: function (text, evt, template) {
      var modifier = new Object({});
      modifier['characterattributes.' + this.index + '.value'] = text;
      Characters.update(Characters.selectedId(), {$set: modifier});
      evt.target.value = text;
    }
  })
);

Template.avatarcharacter.events({
  'change .avatarInput': function(event, template) {
    var charId = Characters.selectedId();
    var files = event.target.files;
    if (event.target.id) {
      Images.remove(event.target.id);
    }
    Images.insert(files[0], function(err, fileObj) {
      if (charId) {
         Characters.update(charId,  {$set: {'avatarfile_id': fileObj._id }});
      }
    });
  }
});