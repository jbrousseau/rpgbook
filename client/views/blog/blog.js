/* global Template Meteor */
/* global Blogposts */
/* global Users */
/* global okCancelEvents */

Template.blog.blog_posts = function() {
  return Blogposts.find({}, {
    sort: {
      timestamp: -1
    }
  });
};
Template.blog.isadmin = function() {
  if (Meteor.user() && Meteor.user().profile.admin && Meteor.user().profile.admin == 1) {
    return true;
  }
  else {
    return false;
  }
};
Template.blog.events(okCancelEvents('#new-post', {
  ok: function(text, evt, template) {
    Blogposts.insert({
      txt: text,
      title: template.find('#titleblogpost').value,
      user_id: Meteor.userId(),
      timestamp: (new Date()).getTime()
    });
    evt.target.value = '';
  }
}));
Template.blogpost.user_name = function() {
  var user = Meteor.users.findOne({
    _id: this.user_id
  });
  if (user && user.profile) {
    return user.profile.firstname + ' ' + user.profile.lastname;
  } else {
    return '';
  }
}