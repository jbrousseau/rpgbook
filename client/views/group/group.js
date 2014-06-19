Template.character.rendered = function() {
  document.title = this.name;
  return $("<meta>", {
    name: "description",
    content: "Detail of Group " + this.name
  }).appendTo("head");
};