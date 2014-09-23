/* global Meteor Template */
/* global Groups Characters Characterposts Images okCancelEvents */

Template.characterposts.character_posts = function() {
  var posts = null;
  if (Groups.selectedId()) {
    posts = Characterposts.find({
      character_id: {
        $in: Groups.selectedected().character_ids
      }
    }, {
      sort: {
        timestamp: -1
      }
    });
  }
  else {
    posts = Characterposts.find({
      character_id: Characters.selectedId()
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
      character_id: Characters.selectedId(),
      user_id: Meteor.userId(),
      visibility: template.find('#visibility-post').value,
      owner_id: Characters.selectedId(),
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
  var characterSelected = Characters.selected();
  
  if ((this.character_id == characterSelected._id && 
    characterSelected.user_id == Meteor.userId())
  || this.visibility == 'public' 
  || (this.visibility == 'group' &&
  characterSelected.user_id == Meteor.userId())) {
    return true;
  }
  else {
    return false;
  }

};