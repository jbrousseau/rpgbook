/* global UI Router */
UI.registerHelper("activePage", function(routeName) {
  var ctx = Router.current();
  var routeNames = routeName.split(',');
  for (var i = 0; i < routeNames.length; i++) {

    if (ctx && (ctx.route.name === routeNames[i])) {
      return "active";
    }
  }
  return '';
});
  