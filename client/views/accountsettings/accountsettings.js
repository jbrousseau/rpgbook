Template.accountsettings.events({
  'change .avatar': function(event, template) {
    var file = event.target.files[0];
    var userId = Meteor.userId();
    var fileObj = Images.insert(file);
    console.log('Upload result: ', fileObj);
    console.log('Upload result: ', fileObj.url());
    if (userId) {
      Meteor.users.update({_id: userId}, {$set: {avatarfile: fileObj.url()}});
    }
  }
});