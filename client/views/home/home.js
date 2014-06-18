Template.home.rendered = function() {
  document.title = "RoleBook";
  return $("<meta>", {
    name: "description",
    content: "Page description for My New Meteor App"
  }).appendTo("head");
};
