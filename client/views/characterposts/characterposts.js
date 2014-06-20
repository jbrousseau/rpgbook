Template.characterposts.character_posts = function () {
    var posts = null;
    if (Session.get("current_group")) {
      posts = Characterposts.find({ character_id: { $in: Session.get("current_group").character_ids}}, {sort: {timestamp: -1}});
    } else {
       posts = Characterposts.find({ character_id: Session.get('selected_character')});
    }
    return posts;
};
Template.characterposts.events(okCancelEvents(
  '#new-post',
  {
    ok: function (text, evt, template) {
      Characterposts.insert({
        txt: text,
        character_id:  Session.get('selected_character'),
        user_id: Meteor.userId(),
        visibility:template.find('#visibility-post').value,
        owner_id: Session.get('selected_character'),
        timestamp: (new Date()).getTime()
      });
      evt.target.value = '';
    }
  })
);
Template.characterpost.owner_name = function () {
  var char = Characters.findOne({ _id: this.owner_id});
  return char.name;
}
Template.characterpost.character_post_rights = function() {
  if (this.character_id == Session.get('selected_character') 
  || this.visibility == 'public' 
  || this.visibility == 'group') {
    return true;
  }
  else {
    return false;
  }

}