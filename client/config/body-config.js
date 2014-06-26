Meteor.startup(function() {
  $('html').attr('lang', 'en');
  $('body').attr('id', 'top');
  $('body').attr('data-spy', 'scroll');
  $('body').attr('data-target', '.navbar-fixed-top');
});