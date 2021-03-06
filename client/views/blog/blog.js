/* global Template Meteor */
/* global Blogposts */
/* global Users */
/* global okCancelEvents moment */

Template.blog.blog_posts = function() {
  return Blogposts.find({}, {
    sort: {
      timestamp: -1
    }
  });
};
var isadmin = function() {
  if (Meteor.user() && Meteor.user().profile.admin && Meteor.user().profile.admin == 1) {
    return true;
  }
  else {
    return false;
  }
};
Template.blog.isadmin = function() {
  return isadmin();
}
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
Template.blogpost.isadmin = function() {
  return isadmin();
}
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
Template.blogpost.display_date = function() {
  return moment(this.timestamp).format('MMMM Do YYYY, h:mm:ss a');
}
Template.blogpost.events({
  'click .delete': function (evt) {
    Blogposts.remove({_id:this._id});
  },
});