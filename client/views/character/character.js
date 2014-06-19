Template.character.rendered = function() {
  document.title = Router.getData().name;
  return $("<meta>", {
    name: "description",
    content: "Detail of character " + Router.getData().name
  }).appendTo("head");
};
Template.character.invited_group = function () {
  var groups = null;
  if (this.invit_group_ids) {
    groups = Groups.find({ _id: { $in: this.invit_group_ids}});
  
  }
  return groups;
};