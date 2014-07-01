/* global Template for Meteor */
/* global Images model */
Template.avataraccount.events({
  'change .avatarInput': function(event, template) {

    var userId = Meteor.userId();
    var files = event.target.files;
    if (event.target.id) {
      Images.remove(event.target.id);
    }
    Images.insert(files[0], function(err, fileObj) {
      if (userId) {
         Meteor.users.update({_id: userId}, {$set: {'profile.avatarfile_id': fileObj._id }});
      }
    });
  }
});

Template.avataraccount.avatarFile = function() {
  var avatarFile = null;
  if (Meteor.user() && Meteor.user().profile.avatarfile_id) {
    avatarFile = Images.find({_id: Meteor.user().profile.avatarfile_id});
  }
  return avatarFile;
};
