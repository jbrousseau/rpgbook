Template.charactersearch.events({
  'click input.invite-character': function (evt) {
    var characterId = Session.get("selected_charactersearch");
    var groupId = Session.get("selected_group");
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
  var groupId = Session.get("selected_group");
  var character = Characters.findOne(this._id);
  if (character && character.invit_group_ids) {
    for (var key in character.invit_group_ids){
      if (character.invit_group_ids[key] == groupId) {
        return true;
      }
    }
  }
  return false;
};