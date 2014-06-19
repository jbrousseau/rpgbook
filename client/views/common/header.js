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
Template.header.helpers({
  activePage: function(routeNames) {
    ctx = Router.current();
    var routeNames = routeNames.split(',');
    for (var i = 0; i < routeNames.length; i++) {

      if (ctx && (ctx.route.name === routeNames[i])) {
        return "active";
      }
    }
    return '';
  }
});