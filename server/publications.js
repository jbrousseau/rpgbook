/* global Meteor */
/* global Characters model */
/* global Groups model */
/* global Characterposts model */
/* global Groupposts model */
/* global Blogposts model */
/* global Images model */
/* global Rules model */
Meteor.publish("characters", function () {
    return Characters.find({}, {fields: {name: 1, user_id: 1, invit_group_ids:1, group_id:1, characterattributes: 1, rules_name:1, avatarfile_id: 1, description: 1}});
});
Meteor.publish("groups", function () {
    return Groups.find({}, {fields: {name: 1, user_id: 1, character_ids: 1, invit_character_ids: 1}});
});
Meteor.publish("characterposts", function () {
    return Characterposts.find({}, {fields: {txt: 1, user_id:1, character_id: 1, visibility: 1, owner_id: 1, 
      reply_id: 1, timestamp: 1}});
});
Meteor.publish("groupposts", function () {
    return Groupposts.find({}, {fields: {txt: 1, user_id:1, group_id: 1, visibility: 1, owner_id: 1, type: 1, timestamp: 1}});
});
Meteor.publish("blogposts", function () {
    return Blogposts.find({}, {fields: {txt: 1, title:1, visibility: 1, user_id: 1, type: 1, timestamp: 1}});
});
Meteor.publish("images", function () {
    return Images.find({});
});
Meteor.publish("rules", function () {
    return Rules.find({}, {fields: {attributes: 1, title:1, visibility: 1, user_id: 1, type: 1, timestamp: 1}});
});
// server
Meteor.publish("userData", function () {
  if (!this.userId) {
    return Meteor.users.find({}, {fields: {'profile': 1}});
  } else {
    return Meteor.users.find({_id: this.userId},
                             {fields: {'profile': 1, 'emails': 1}});
  }
});
Characters.allow({
  'insert': function (userId,doc) {
    if (userId!==null && userId == doc.user_id) {
      return true;
    } else {
      return false;
    }
  },
  'remove': function (userId,doc) {
    if (userId!==null && userId == doc.user_id) {
      return true;
    } else {
      return false;
    }
  },
  'update': function (userId,doc,fieldNames) {
    if (userId!==null && userId == doc.user_id) {
      return true;
    } else if (fieldNames.indexOf('invit_group_ids') >=0 && fieldNames.length==1) {
      return true;
    } else {
      return false;
    }
  }
});
Groups.allow({
  'insert': function (userId,doc) {
    if (userId!==null && userId == doc.user_id) {
      return true;
    } else {
      return false;
    }
  },
  'remove': function (userId,doc) {
    if (userId!==null && userId == doc.user_id) {
      return true;
    } else {
      return false;
    }
  },
  'update': function (userId,doc, fieldNames) {
    if (userId!==null && userId == doc.user_id) {
      return true;
    } else if (fieldNames.indexOf('character_ids') >=0 
        && fieldNames.indexOf('invit_character_ids') >=0
        && fieldNames.length==2) {
      return true;
    } else {
      return false;
    }
  }
});
Characterposts.allow({
  'insert': function (userId,doc) {
    if (userId!==null && userId == doc.user_id) {
      return true;
    } else {
      return false;
    }
  },
  'remove': function (userId,doc) {
    if (userId!==null && userId == doc.user_id) {
      return true;
    } else {
      return false;
    }
  },
  'update': function (userId,doc) {
    if (userId!==null && userId == doc.user_id) {
      return true;
    } else {
      return false;
    }
  }
});
Groupposts.allow({
  'insert': function (userId,doc) {
    if (userId!==null && userId == doc.user_id) {
      return true;
    } else {
      return false;
    }
  },
  'remove': function (userId,doc) {
    if (userId!==null && userId == doc.user_id) {
      return true;
    } else {
      return false;
    }
  },
  'update': function (userId,doc) {
    if (userId!==null && userId == doc.user_id) {
      return true;
    } else {
      return false;
    }
  }
});
Blogposts.allow({
  'insert': function (userId,doc) {
    if (userId!==null && userId == doc.user_id) {
      return true;
    } else {
      return false;
    }
  },
  'remove': function (userId,doc) {
    if (userId!==null && userId == doc.user_id) {
      return true;
    } else {
      return false;
    }
  },
  'update': function (userId,doc) {
    if (userId!==null && userId == doc.user_id) {
      return true;
    } else {
      return false;
    }
  }
});
Images.allow({
  'insert': function (userId,doc) {
    return true;
  },
  'remove': function (userId,doc) {
    return true;
  },
  'update': function (userId,doc) {
    return true;
  },
  'download': function (userId,doc) {
    return true;
  }
});
Rules.allow({
  'insert': function (userId,doc) {
    return true;
  },
  'remove': function (userId,doc) {
    return true;
  },
  'update': function (userId,doc) {
    return true;
  }
});
Meteor.users.allow({
  'update': function(userId, doc) {
    return true;
  }
});