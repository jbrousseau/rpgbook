/* global Template for Meteor Accounts */
/* global Images model */
Template.accountsettings.address = function() {
  var user = Meteor.user();
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
    Meteor.users.changeAvatar(Meteor.userId(), event.target.files[0], event.target.id);
  }
});