Template.home.rendered = function() {
  document.title = "RoleBook";
  return $("<meta>", {
    name: "description",
    content: "Page description for My New Meteor App"
  }).appendTo("head");
};
Template.home.events({
  'click .page-scroll a': function(event) {
    var $anchor = $(event.currentTarget);
    $('html, body').stop().animate({
      scrollTop: $($anchor.attr('href')).offset().top
    }, 1500, 'easeInOutExpo');
    event.preventDefault();
  }
});