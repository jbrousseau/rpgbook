/* global Template for Meteor Accounts */
/* global Images model */
Template.accountsettings.address = function() {
  var user = Meteor.user();
  console.log(Meteor.users);
  console.log(Characters);
  if (user && user.emails && user.emails[0] && user.emails[0].address) {
    return user.emails[0].address;
  }
  return '';
};

Template.accountsettings.events({
  'click input.okupdatesettings': function(event, template) {
    var userId = Meteor.userId();
    if (userId) {
      Meteor.users.update({
        _id: userId
      }, {
        $set: {
          'profile.firstname': template.find('#firstname').value,
          'profile.lastname': template.find('#lastname').value
        }
      });
      if (template.find('#oldpassword').value && template.find('#newpassword').value) {
        Accounts.changePassword(template.find('#oldpassword').value, template.find('#newpassword').value, function(err) {
          if (err) {
            alert(err);
          }
        });
      }
    }
  }
});

Template.avataraccount.events({
  'change .avatarInput': function(event, template) {

    var userId = Meteor.userId();
    var files = event.target.files;
    if (event.target.id) {
      Images.remove(event.target.id);
    }
    Images.insert(files[0], function(err, fileObj) {
      if (userId) {
        Meteor.users.update({
          _id: userId
        }, {
          $set: {
            'profile.avatarfile_id': fileObj._id
          }
        });
      }
    });
  }
});