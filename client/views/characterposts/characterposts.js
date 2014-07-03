/* global Meteor Template Session */
/* global Groups Characters Characterposts Images okCancelEvents */
var editable = function() {
  var userId = Meteor.userId();
  var character_user_id = Session.get("character_user_id");
  if (character_user_id == userId) {
    return true;
  } else {
    return false;
  }
};
Template.characterposts.editable = function() {
  return editable();
};

Template.characterposts.character_posts = function() {
  var posts = null;
  if (Session.get("current_group")) {
    posts = Characterposts.find({
      character_id: {
        $in: Session.get("current_group").character_ids
      }
    }, {
      sort: {
        timestamp: -1
      }
    });
  }
  else {
    posts = Characterposts.find({
      character_id: Session.get('selected_character')
    }, {
      sort: {
        timestamp: -1
      }
    });
  }
  return posts;
};
Template.characterposts.events(okCancelEvents('#new-post', {
  ok: function(text, evt, template) {
    Characterposts.insert({
      txt: text,
      character_id: Session.get('selected_character'),
      user_id: Meteor.userId(),
      visibility: template.find('#visibility-post').value,
      owner_id: Session.get('selected_character'),
      timestamp: (new Date()).getTime()
    });
    evt.target.value = '';
  }
}));
Template.characterpost.owner_name = function() {
  var char = Characters.findOne({
    _id: this.owner_id
  });
  if (char) {
    return char.name;
  } else {
    return '';
  }
};
Template.characterpost.character_post_rights = function() {
  var character_user_id = Session.get("character_user_id");
  
  if ((this.character_id == Session.get('selected_character') && 
    character_user_id == Meteor.userId())
  || this.visibility == 'public' 
  || (this.visibility == 'group' &&
  character_user_id == Meteor.userId())) {
    return true;
  }
  else {
    return false;
  }

};