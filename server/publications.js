
/*Meteor.publish("userCharacters", function () {
  if (this.userId) {
    return Meteor.character.find({user_id: this.userId}, {fields: {name: 1, user_id: 1}});
  } else {
     return null;
  }
});*/
Characters.allow({
  'insert': function (userId,doc) {
    /* user and doc checks ,
    return true to allow insert */
    if (userId!=null) {
      return true;
    } else {
      return false;
    }
  }
});