/* global Meteor Template Deps Router Images */

Template.header.displayName = function () {
  var user = Meteor.user();
  if (!user)
    return '';

  if (user.profile && user.profile.name)
    return user.profile.name;
  if (user.username)
    return user.username;
  if (user.emails && user.emails[0] && user.emails[0].address)
    return user.emails[0].address;

  return '';
};
Template.header.getCharacter = function() {
   var currentRoute = Router.current();
   if (currentRoute.params.name) {
     return currentRoute.params.name;
   } else {
     return false;
   }
};
Template.header.navbarCustomHome = function() {
  var ctx = Router.current();
  //this is a little crap. TODO:find better way to do that
  if (ctx && ctx.route.name === 'home') {
      $('body').attr('style', 'margin-top:0px');
  } else {
      $('body').attr('style', 'margin-top:100px');
  }
  //------
  if (ctx && ctx.route.name === 'home') {
    return "navbar-home";
  }
  return '';
};
Template.header.events({
  'click .navbar-nav li a': function (evt) {
    $(".navbar-collapse").collapse('hide');
  },
});
Template.entryAccountButtons_custom.avatarFile = function() {
  var avatarFile = [{url:"/img/character/empty.gif"}];
  var user = Meteor.user();
  if (user && user.profile.avatarfile_id) {
    avatarFile = Images.find({_id: user.profile.avatarfile_id});
  }
  return avatarFile;
};
Template.entryAccountButtons_custom.events({
  'click .navbar-nav li a': function (evt) {
    $(".navbar-collapse").collapse('hide');
  },
});