/* global Template Session Groups Characters */
Template.charactersearch.events({
  'click input.invite-character': function (evt) {
    var characterId = Session.get("selected_charactersearch");
    var groupId = Groups.selectedId();
    Groups.update(groupId, {$push: {invit_character_ids: characterId}});
    Characters.update(characterId, {$push: {invit_group_ids: groupId}});
  }
});
Template.characterresult.events({
  'click': function () {
    Session.set("selected_charactersearch", this._id);
  }
});
Template.characterresult.is_invited = function () {
  var character = Characters.findOne(this._id);
  if (character && character.invit_group_ids) {
    for (var key in character.invit_group_ids){
      if (character.invit_group_ids[key] == Groups.selectedId()) {
        return true;
      }
    }
  }
  return false;
};
Template.characterresult.is_in_group = function () {
  var character = Characters.findOne({_id: this._id, group_id: Groups.selectedId()});
  if (character) {
    return true;
  }
  return false;
};