Template.group.rendered = function() {
  document.title = this.name;
  return $("<meta>", {
    name: "description",
    content: "Detail of group " + this.name
  }).appendTo("head");
};
Template.group.characters_group = function () {
  var chars = null;
  if (this.character_ids) {
    chars = Characters.find({ _id: { $in: this.character_ids}});
  }
  //TODO move this to a proper init method (rendered does not work)
  Session.set('selected_group', this._id);
  if (this.user_id == Meteor.userId()) {
    Session.set('selected_character', 'master');
  }
  return chars;
};

Template.group.group_posts = function () {
    var posts = null;
    posts = Groupposts.find({ group_id: this._id}, {sort: {timestamp: -1}});
    return posts;
};
Template.group.group_visibility_posts = function () {
    var visibilities = new Array();
    visibilities.push({name:'public', _id:'public'});
    visibilities.push({name:'Game master', _id:'master'});    
    if (this.character_ids) {
      chars = Characters.find({ _id: { $in: this.character_ids}}).fetch();
      for (var key in chars) {
        if (chars[key]._id != Session.get('selected_character')) {
          visibilities.push(chars[key]);
        }
      }
    }
    
    return visibilities;
};

Template.group.events({
  'click input.roll': function (evt) {
    var result = Math.floor((Math.random() * 20) + 1);
    Groupposts.insert({
        txt: 'd20 roll result : ' + result,
        group_id:  Session.get('selected_group'),
        user_id: Meteor.userId(),
        type:'roll',
        visibility:'public',
        owner_id: Session.get('selected_character'),
        timestamp: (new Date()).getTime()
      });
  }
});
Template.group.events(okCancelEvents(
  '#new-post',
  {
    ok: function (text, evt, template) {
      Groupposts.insert({
        txt: text,
        group_id:  Session.get('selected_group'),
        user_id: Meteor.userId(),
        type:'text',
        visibility:template.find('#visibility-post').value,
        owner_id: Session.get('selected_character'),
        timestamp: (new Date()).getTime()
      });
      evt.target.value = '';
    }
  })
);
Template.grouppost.owner_name = function () {
  if (this.owner_id == 'master') {
    return 'Game master';
  } else {
    var char = Characters.findOne({ _id: this.owner_id});
    if (char) {
      return char.name;
    } else {
      return null;
    }
  }
}
Template.grouppost.group_post_rights = function() {
  if (this.visibility == 'public' 
    || this.visibility == Session.get('selected_character')
    || this.user_id == Meteor.userId()) {
    return true;
  }
  else {
    return false;
  }
}
Template.grouppost.visibility_name = function() {
  var visi = this.visibility;
  if (this.visibility != 'public' && this.visibility != 'master') {
    var char = Characters.findOne({ _id: this.visibility});
    visi = char.name;
  }
  return visi;
}