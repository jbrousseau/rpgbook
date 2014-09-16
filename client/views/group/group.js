/* global Template Session Meteor User */
/* global Characters Groupposts okCancelEvents moment Images Groups*/
Template.group.rendered = function() {
  document.title = this.name;
  return $("<meta>", {
    name: "description",
    content: "Detail of group " + this.name
  }).appendTo("head");
};
Template.group.characters_group = function() {
  var chars = null;
  if (this.character_ids) {
    chars = Characters.find({
      _id: {
        $in: this.character_ids
      }
    });
  }
  return chars;
};
Template.group.gamemaster_name = function() {
  var user = this && this.owner();
  if (user && user.profile) {
    return user.profile.firstname + ' ' + user.profile.lastname;
  }
  else {
    return '';
  }
};
Template.group.avatarFileGM = function() {
  var avatarFile = [{
    url: "/img/character/empty.gif"
  }];
  var user = null;
  if (Session.get("owner_group_id")) {
    user = Meteor.users.findOne({
      _id: Session.get("owner_group_id")
    });
  }
  if (user && user.profile.avatarfile_id) {
    avatarFile = Images.find({
      _id: user.profile.avatarfile_id
    });
  }
  return avatarFile;
};

Template.group.group_posts = function() {
  var posts = null;
  posts = Groupposts.find({
    group_id: this._id
  }, {
    sort: {
      timestamp: -1
    }
  });
  return posts;
};
Template.group.group_visibility_posts = function() {
  var visibilities = [];
  visibilities.push({
    name: 'public',
    _id: 'public'
  });
  visibilities.push({
    name: 'Game master',
    _id: 'master'
  });
  if (this.character_ids) {
    var chars = Characters.find({
      _id: {
        $in: this.character_ids
      }
    }).fetch();
    for (var key in chars) {
      if (chars[key]._id != Characters.selectedId()) {
        visibilities.push(chars[key]);
      }
    }
  }

  return visibilities;
};

var rollDice = function(numberMax) {
  var result = Math.floor((Math.random() * numberMax) + 1);
  Groupposts.insert({
    txt: 'd' + numberMax + ' roll result : ' + result,
    group_id: Session.get('selected_group'),
    user_id: Meteor.userId(),
    type: 'roll',
    visibility: 'public',
    owner_id: Session.get('selected_character'),
    timestamp: (new Date()).getTime()
  });
};

Template.group.events({
  'click input.roll4': function(evt) {
    rollDice(4);
  },
  'click input.roll6': function(evt) {
    rollDice(6);
  },
  'click input.roll8': function(evt) {
    rollDice(8);
  },
  'click input.roll10': function(evt) {
    rollDice(10);
  },
  'click input.roll12': function(evt) {
    rollDice(12);
  },
  'click input.roll20': function(evt) {
    rollDice(20);
  },
  'click input.roll100': function(evt) {
    rollDice(100);
  },
});
Template.group.events(okCancelEvents('#new-post', {
  ok: function(text, evt, template) {
    Groupposts.insert({
      txt: text,
      group_id: Groups.selectedId(),
      user_id: Meteor.userId(),
      type: 'text',
      visibility: template.find('#visibility-post').value,
      owner_id: Session.get('selected_character'),
      timestamp: (new Date()).getTime()
    });
    evt.target.value = '';
  }
}));
Template.grouppost.owner_name = function() {
  if (this.owner_id == 'master') {
    return 'Game master';
  }
  else {
    var char = Characters.findOne({
      _id: this.owner_id
    });
    if (char) {
      return char.name;
    }
    else {
      return null;
    }
  }
};
Template.grouppost.group_post_rights = function() {
  if (this.visibility == 'public' || this.visibility == Session.get('selected_character') || this.user_id == Meteor.userId()) {
    return true;
  }
  else {
    return false;
  }
};
Template.grouppost.display_date = function() {
  return moment(this.timestamp).format('MMMM Do YYYY, h:mm:ss a');
};
Template.grouppost.owner_name_link = function() {
  if (this.owner_id == 'master') {
    return 'Game master';
  }
  else {
    var char = Characters.findOne({
      _id: this.owner_id
    });
    if (char) {
      return '/character/' + char.name;
    }
    else {
      return null;
    }
  }
};

Template.grouppost.visibility_name = function() {
  var visi = this.visibility;
  if (this.visibility != 'public' && this.visibility != 'master') {
    var char = Characters.findOne({
      _id: this.visibility
    });
    if (char) {
      visi = char.name;
    }
  }
  return visi;
};