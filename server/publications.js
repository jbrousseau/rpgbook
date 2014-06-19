
Meteor.publish("characters", function () {
    return Characters.find({}, {fields: {name: 1, user_id: 1, invit_group_ids:1, group_id:1}});
});
Meteor.publish("groups", function () {
    return Groups.find({}, {fields: {name: 1, user_id: 1, character_ids: 1, invit_character_ids: 1}});
});
Characters.allow({
  'insert': function (userId,doc) {
    if (userId!=null && userId == doc.user_id) {
      return true;
    } else {
      return false;
    }
  },
  'remove': function (userId,doc) {
    if (userId!=null && userId == doc.user_id) {
      return true;
    } else {
      return false;
    }
  },
  'update': function (userId,doc) {
      return true;
  }
});
Groups.allow({
  'insert': function (userId,doc) {
    if (userId!=null && userId == doc.user_id) {
      return true;
    } else {
      return false;
    }
  },
  'remove': function (userId,doc) {
    if (userId!=null && userId == doc.user_id) {
      return true;
    } else {
      return false;
    }
  },
  'update': function (userId,doc) {
      return true;
  }
});