Meteor.startup(function() {
  $('html').attr('lang', 'en');
  $('body').attr('id', 'top');
  $('body').attr('data-spy', 'scroll');
  $('body').attr('data-target', '.navbar-fixed-top');
});
bodyConfig = function () {
  ctx = Router.current();
  if (ctx && ctx.route.name === 'home') {
      $('body').attr('style', 'margin-top:0px');
  } else {
      $('body').attr('style', 'margin-top:100px');
  }
};